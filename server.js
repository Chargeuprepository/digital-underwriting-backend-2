import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  typeDefs,
  resolvers,
} from "./SchemaResolvers/ParentFolder-SRs/Parent-SR.js";
import redisClient from "./redisClient.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "https://underwrite.echargeup.com", // Frontend domain
    credentials: true, // Allow cookies if needed
  })
);

app.set("trust proxy", true);

dotenv.config();

const startServer = async () => {
  try {
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
