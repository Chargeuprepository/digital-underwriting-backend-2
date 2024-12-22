import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./SchemaResolvers/Parent-SRs/parent-SR.js";
import redisClient from "./redisClient.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    const app = express();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        redis: redisClient,
      }),
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Critical server error:", error);
    process.exit(1); // Exit process so it can restart
  }
};

// Start the server
startServer();

// Global process error handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1); // Exit process on critical error
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // Exit process on critical promise rejection
});
