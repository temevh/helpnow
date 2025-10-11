import { Context } from "../../context";

export const volunteerResolvers = {
  Query: {
    volunteers: async (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.volunteer.findMany({
        include: { user: true },
      });
    },
  },
};
