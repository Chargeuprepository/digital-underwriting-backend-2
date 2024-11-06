import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./SchemaResolvers/Parent-SRs/parent-SR.js";

export const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

// import { app } from "./app.js";

// app.listen(8000, (req, res) => {
//   console.log("server is listening at port 8000");
// });
