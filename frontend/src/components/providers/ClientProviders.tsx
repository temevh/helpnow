"use client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import client from "@/graphql/client";
import { SessionProvider } from "next-auth/react";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}
