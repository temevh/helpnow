import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
