import { Context } from "../../context";

type VolunteerPostArgs = {
  postId: string;
  userId: string;
};

type GetVolunteeredPostsArgs = {
  userId: string;
};

export const postResolvers = {
  Query: {
    posts: async (_parent: unknown, _args: unknown, context: Context) => {
      try {
        const posts = await context.prisma.post.findMany({
          include: { creator: true },
          where: { status: "OPEN" },
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
      context: Context
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
        return volunteers;
      } catch (err) {
        console.error("Error fetching volunteered posts", err);
        throw err;
      }
    },
  },

  Mutation: {
    volunteerPost: async (
      _parent: unknown,
      args: VolunteerPostArgs,
      context: Context
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
          (v) => v.userId === userId
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

        // Update the post's volunteersAlready count
        await context.prisma.post.update({
          where: { id: postId },
          data: {
            volunteersAlready: {
              increment: 1,
            },
          },
        });

        return volunteer;
      } catch (err) {
        console.error("Error volunteering for post:", err);
        throw err;
      }
    },
  },
};
