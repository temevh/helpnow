import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_API_URL ||
      "http://localhost:5000/graphql",
  }),
  cache: new InMemoryCache(),
});
export default client;
