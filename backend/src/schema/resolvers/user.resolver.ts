import { Context } from "../../context";
import bcrypt from "bcryptjs";

type CreateUserArgs = {
  username: string;
  email: string;
  password: string;
};

type AuthenticateUserArgs = {
  username: string;
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
    createUser: async (
      _parent: unknown,
      args: CreateUserArgs,
      context: Context
    ) => {
      const { email, password, username } = args;

      const existingEmail = await context.prisma.user.findUnique({
        where: { email },
      });

      const existingUsername = await context.prisma.user.findUnique({
        where: { username },
      });

      if (existingEmail) {
        console.error("User already exists with this email");
        return {
          user: null,
          message: "Email already exists",
        };
      }

      if (existingUsername) {
        console.error("User already exists with this username");
        return {
          user: null,
          message: "Username already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await context.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          firstName: "",
          lastName: "",
        },
      });

      return { user, message: "User created succesfully" };
    },

    authenticateUser: async (
      _parent: unknown,
      args: AuthenticateUserArgs,
      context: Context
    ) => {
      const { username, password } = args;

      const user = await context.prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new Error("Invalid username or password");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid username or password");
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    },
  },
};
