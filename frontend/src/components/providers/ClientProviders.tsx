"use client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "@/components/ui/provider";
import client from "@/graphql/client";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ClientProvidersProps {
  session: Session | null;
  children: React.ReactNode;
}

export function ClientProviders({ session, children }: ClientProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Provider>{children}</Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}
