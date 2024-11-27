import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./SchemaResolvers/Parent-SRs/parent-SR.js";
import redisClient from "./redisClient.js";

import dotenv from "dotenv";
dotenv.config();
export const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    redis: redisClient,
  }),
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

/////////////////////////////////////////////////////////////////////////////////

// // TESTING_PURPOSE 😊😊😍

// import express from "express";
// export const app = express();

// app.use("/", async (req, res) => {
//   const response = await fetch(
//     "https://script.google.com/macros/s/AKfycbyAX63oCVNXWN-SUFoPvCAkK9tJMbLNG_hfY2i23qJtcsAeNXywJ64zfvE5Jc3BrHRC8Q/exec"
//   );
//   const data = await response.json();
//   res.json(data);
// });

// app.listen(8080, (req, res) => {
//   console.log("listening on 8080");
// });
