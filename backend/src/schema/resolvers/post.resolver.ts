import { Context } from "../../context";

export const postResolvers = {
  Query: {
    posts: async (_parent: unknown, _args: unknown, context: Context) => {
      try {
        const posts = await context.prisma.post.findMany({
          include: { creator: true, volunteers: true },
        });
        return posts;
      } catch (err) {
        console.error("Error fetching posts:", err);
        return []; // prevent GraphQL null error
      }
    },
  },
};
