import { Context } from "../../context";
import bcrypt from "bcryptjs";

type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
};

type AuthenticateUserArgs = {
  email: string;
  password: string;
};

export const userResolvers = {
  Query: {
    users: async (_parent: unknown, _args: unknown, context: Context) => {
      return context.prisma.user.findMany({
        include: { posts: true, volunteers: true },
      });
    },
  },
  Mutation: {
    signUp: async (
      _parent: unknown,
      args: CreateUserArgs,
      context: Context
    ) => {
      const { email, password, username } = args;

      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await context.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.username,
        },
        message: "User created successfully",
      };
    },
    authenticateUser: async (
      _parent: unknown,
      args: AuthenticateUserArgs,
      context: Context
    ) => {
      const { email, password } = args;

      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        message: "Authentication suffessful",
      };
    },
  },
};
