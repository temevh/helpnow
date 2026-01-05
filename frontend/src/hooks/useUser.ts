import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();
  console.log("session", session);

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
  };
};
