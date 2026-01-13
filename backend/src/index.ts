import "dotenv/config";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers/index";
import { context } from "./context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
