import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTHENTICATE_USER } from "@/graphql/mutations/user";
import client from "@/graphql/client";

interface AuthenticateUserResponse {
  authenticateUser?: {
    user?: {
      id: string;
      email: string;
      name: string;
    };
  };
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "b89897hb089u",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate<AuthenticateUserResponse>({
            mutation: AUTHENTICATE_USER,
            variables: {
              username: credentials?.username,
              password: credentials?.password,
            },
          });

          if (data?.authenticateUser?.user) {
            return {
              id: data.authenticateUser.user.id,
              email: data.authenticateUser.user.email,
              name: data.authenticateUser.user.name,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as {
          id: string;
          email: string;
          name: string;
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
