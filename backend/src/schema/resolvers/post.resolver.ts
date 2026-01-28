import { PostStatus } from "@prisma/client";
import { Context, prisma } from "../../context";

type VolunteerPostArgs = {
  postId: string;
  userId: string;
};

type CreatePostArgs = {
  post: any;
};

type EditPostArgs = {
  postId: string;
  userId: string;
  post: any;
};

type GetVolunteeredPostsArgs = {
  userId: string;
};

type GetCreatedPostsArgs = {
  userId: string;
};

export const postResolvers = {
  Query: {
    posts: async (_parent: unknown, _args: unknown, context: Context) => {
      try {
        const posts = await context.prisma.post.findMany({
          include: { creator: true },
          where: {
            OR: [
              { status: PostStatus["FILLED"] },
              { status: PostStatus["OPEN"] },
              { status: PostStatus["ACCEPTED"] },
            ],
          },
        });
        return posts;
      } catch (err) {
        console.error("Error fetching posts:", err);
        return [];
      }
    },

    getVolunteeredPosts: async (
      _parent: unknown,
      args: GetVolunteeredPostsArgs,
      context: Context,
    ) => {
      try {
        const { userId } = args;

        const volunteers = await context.prisma.volunteer.findMany({
          where: { userId },
          include: {
            user: true,
            post: {
              include: {
                creator: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        console.log(volunteers);

        return volunteers.map((volunteer) => {
          const d = volunteer.post.locationReveal;
          let addressToShow = `${d.getDate().toString().padStart(2, "0")}.${(
            d.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}.${d.getFullYear()} ${d
            .getHours()
            .toString()
            .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;

          if (Date.now() >= volunteer.post.locationReveal.getTime()) {
            addressToShow = volunteer.post.address;
          }

          return {
            ...volunteer,
            post: {
              ...volunteer.post,
              address: addressToShow,
            },
          };
        });
      } catch (err) {
        console.error("Error fetching volunteered posts", err);
        throw err;
      }
    },
    getCreatedPosts: async (
      _parent: unknown,
      args: GetCreatedPostsArgs,
      context: Context,
    ) => {
      try {
        const { userId } = args;

        const posts = await context.prisma.post.findMany({
          where: { userId },
          include: {
            creator: true,
            volunteers: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return posts;
      } catch (err) {
        console.error("Error fetching created posts", err);
        throw err;
      }
    },
  },

  Mutation: {
    volunteerPost: async (
      _parent: unknown,
      args: VolunteerPostArgs,
      context: Context,
    ) => {
      try {
        const { postId, userId } = args;

        const post = await context.prisma.post.findUnique({
          where: { id: postId },
          include: { volunteers: true },
        });

        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        });

        if (!post) {
          throw new Error("Post not found");
        }

        if (!user) {
          throw new Error("User not found");
        }

        // Check if post is still accepting volunteers
        if (post.volunteersAlready >= post.volunteersNeeded) {
          throw new Error("This post already has enough volunteers");
        }

        // Check if user already volunteered for this post
        const existingVolunteer = post.volunteers.find(
          (v) => v.userId === userId,
        );
        if (existingVolunteer) {
          throw new Error("You have already volunteered for this post");
        }

        // Create volunteer entry and increment volunteersAlready
        const volunteer = await context.prisma.volunteer.create({
          data: {
            userId: userId,
            postId: postId,
            accepted: false,
          },
          include: {
            user: true,
            post: true,
          },
        });

        // Update the post's volunteersAlready count and check if filled
        const updatedPost = await context.prisma.post.update({
          where: { id: postId },
          data: {
            volunteersAlready: {
              increment: 1,
            },
          },
        });

        // If the post is now filled, update status to FILLED
        if (updatedPost.volunteersAlready >= updatedPost.volunteersNeeded) {
          await context.prisma.post.update({
            where: { id: postId },
            data: {
              status: PostStatus.FILLED,
            },
          });
        }

        return volunteer;
      } catch (err) {
        console.error("Error volunteering for post:", err);
        throw err;
      }
    },
    cancelVolunteer: async (
      _parent: unknown,
      args: VolunteerPostArgs,
      context: Context,
    ) => {
      try {
        const { postId, userId } = args;

        const post = await context.prisma.post.findUnique({
          where: { id: postId },
          include: { volunteers: true },
        });

        const user = await context.prisma.user.findUnique({
          where: { id: userId },
        });

        if (!post) {
          throw new Error("Post not found");
        }

        if (!user) {
          throw new Error("User not found");
        }

        // Check if user has volunteered for this post
        const existingVolunteer = post.volunteers.find(
          (v) => v.userId === userId,
        );

        if (!existingVolunteer) {
          throw new Error("You have not volunteered for this post");
        }

        // Delete the volunteer entry
        await context.prisma.volunteer.delete({
          where: {
            userId_postId: {
              userId: userId,
              postId: postId,
            },
          },
        });

        // Decrement the volunteersAlready count
        const updatedPost = await context.prisma.post.update({
          where: { id: postId },
          data: {
            volunteersAlready: {
              decrement: 1,
            },
          },
        });

        // If the post was FILLED and now has space, change status back to OPEN
        if (
          post.status === PostStatus.FILLED &&
          updatedPost.volunteersAlready < updatedPost.volunteersNeeded
        ) {
          await context.prisma.post.update({
            where: { id: postId },
            data: {
              status: PostStatus.OPEN,
            },
          });
        }

        return true;
      } catch (err) {
        console.error("Error cancelling volunteer:", err);
        return false;
      }
    },
    deletePost: async (
      _parent: unknown,
      args: VolunteerPostArgs,
      context: Context,
    ) => {
      try {
        const { postId, userId } = args;
        console.log(args);

        const post = await context.prisma.post.findUnique({
          where: { id: postId },
        });

        if (post?.userId !== userId) {
          console.error("You are not authorized to delete this post");
          return false;
        }

        if (!post) {
          console.error("Post not found");
          return false;
        }

        await context.prisma.post.delete({
          where: {
            id: postId,
          },
        });

        return true;
      } catch (err) {
        console.error("Error cancelling volunteer:", err);
        return false;
      }
    },
    createPost: async (
      _parent: unknown,
      args: CreatePostArgs,
      context: Context,
    ) => {
      try {
        const { post } = args;
        console.log(args);

        if (!post) {
          throw new Error("Error creating post");
        }

        // Validate required fields
        if (!post.name || !post.address || !post.taskTime || !post.userId) {
          throw new Error("Missing required fields");
        }

        const postGeocode = `${post.address}+${post.postcode}+${post.region}+${post.country}`;
        const apikey = process.env.GEOCODE_API_KEY;
        // Geocode the address to get latitude and longitude
        const apiResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${postGeocode}&key=${apikey}`,
        );
        const geocodeData = await apiResponse.json();
        if (
          geocodeData &&
          geocodeData.results &&
          geocodeData.results.length > 0 &&
          geocodeData.status === "OK"
        ) {
          // Create the post
          const lat =
            Math.trunc(geocodeData.results[0].geometry.location.lat * 1000) /
            1000;
          const lng =
            Math.trunc(geocodeData.results[0].geometry.location.lng * 1000) /
            1000;

          const newPost = await context.prisma.post.create({
            data: {
              name: post.name,
              description: post.description || "",
              address: post.address,
              country: post.country,
              region: post.region,
              postcode: post.postcode,
              latitude: lat,
              longitude: lng,
              taskTime: new Date(post.taskTime),
              locationReveal: new Date(post.locationReveal),
              userId: post.userId,
              volunteersNeeded: post.volunteersNeeded || 1,
              volunteersAlready: 0,
              status: PostStatus.OPEN,
              reward: post.reward || 0,
            },
            include: {
              creator: true,
            },
          });

          return newPost;
        }
      } catch (err) {
        console.error("Error creating post:", err);
        throw err;
      }
    },
    editPost: async (
      _parent: unknown,
      args: EditPostArgs,
      context: Context,
    ) => {
      try {
        const { postId, userId, post } = args;

        const existingPost = await context.prisma.post.findUnique({
          where: { id: postId },
        });

        if (!existingPost) {
          throw new Error("Post not found");
        }

        if (existingPost.userId !== userId) {
          throw new Error("You are not authorized to edit this post");
        }

        const updateData: any = {};

        if (post.name) updateData.name = post.name;
        if (post.description !== undefined) updateData.description = post.description;
        if (post.volunteersNeeded) updateData.volunteersNeeded = post.volunteersNeeded;
        if (post.taskTime) updateData.taskTime = new Date(post.taskTime);

        if (post.address && post.address !== existingPost.address) {
          updateData.address = post.address;
          
          const apikey = process.env.GEOCODE_API_KEY;
          const apiResponse = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              post.address,
            )}&key=${apikey}`,
          );
          const geocodeData = await apiResponse.json();
          
          if (
            geocodeData &&
            geocodeData.results &&
            geocodeData.results.length > 0 &&
            geocodeData.status === "OK"
          ) {
            const lat =
              Math.trunc(geocodeData.results[0].geometry.location.lat * 1000) /
              1000;
            const lng =
              Math.trunc(geocodeData.results[0].geometry.location.lng * 1000) /
              1000;

            updateData.latitude = lat;
            updateData.longitude = lng;
          }
        }

        await context.prisma.post.update({
          where: { id: postId },
          data: updateData,
        });

        return true;
      } catch (err) {
        console.error("Error editing post:", err);
        throw err;
      }
    },
  },
};
