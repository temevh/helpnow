import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers/index.js";
import { context } from "./context.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen({ port: 5000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
