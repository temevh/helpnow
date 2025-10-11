"use client";
import { ApolloProvider } from "@apollo/client/react";
import { Provider } from "@/components/ui/provider";
import client from "@/graphql/client";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <Provider>{children}</Provider>
    </ApolloProvider>
  );
}
