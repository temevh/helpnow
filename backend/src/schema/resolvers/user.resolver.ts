import { Context } from "../../context";

type CreateUserArgs = {
  name: string;
  email: string;
};

export const userResolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.user.findMany({
        include: { posts: true, volunteers: true },
      });
    },
  },
};
