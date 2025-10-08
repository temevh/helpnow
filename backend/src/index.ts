import {ApolloServer} from "apollo-server"
import {typeDefs} from "./schema/typeDefs.js"
import {resolvers} from "./schema/resolvers.js"
import {context} from "./context"


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.listen({post: 5000}).then(({url} => {
    console.log(`🚀 Server ready at: ${url}`);
}))