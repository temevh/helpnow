export const userResolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      return context.prisma.user.findMany({
        include: { posts: true, volunteers: true },
      });
    },
  },
  Mutation: {
    createUser: async (_parent, args, context) => {
      return context.prisma.user.create({ data: args });
    },
  },
};
