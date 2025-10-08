import { Context } from "../../context";

export const postResolvers = {
  Query: {
    posts: async (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.post.findMany({
        include: { creator: true, volunteers: true },
      });
    },
  },
};
