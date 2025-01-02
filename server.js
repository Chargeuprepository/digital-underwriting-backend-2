// import express from "express";
// import { ApolloServer } from "apollo-server-express";
// import {
//   typeDefs,
//   resolvers,
// } from "./SchemaResolvers/ParentFolder-SRs/Parent-SR.js";
// import redisClient from "./redisClient.js";
// import dotenv from "dotenv";
// import cors from "cors";

// const app = express();
// app.use(cors());

// dotenv.config();

// const startServer = async () => {
//   try {
//     const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//       context: () => ({
//         redis: redisClient,
//       }),
//     });

//     await server.start();
//     server.applyMiddleware({ app });

//     app.listen({ port: 4000 }, () => {
//       console.log(
//         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
//       );
//     });
//   } catch (error) {
//     console.error("Critical server error:", error);
//     process.exit(1); // Exit process so it can restart
//   }
// };

// // Start the server
// startServer();

// // Global process error handlers
// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
//   process.exit(1); // Exit process on critical error
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection at:", promise, "reason:", reason);
//   process.exit(1); // Exit process on critical promise rejection
// });

import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  typeDefs,
  resolvers,
} from "./SchemaResolvers/ParentFolder-SRs/Parent-SR.js";
import redisClient from "./redisClient.js";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";

const app = express();
app.use(cors());

dotenv.config();

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/underwrite.echargeup.com/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/underwrite.echargeup.com/fullchain.pem"
  ),
};

// Redirect HTTP to HTTPS
const http = express();
http.use((req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
http.listen(80, () => {
  console.log("Redirecting HTTP traffic to HTTPS...");
});

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

    // Start HTTPS server
    https.createServer(sslOptions, app).listen(443, () => {
      console.log(
        `🚀 Server ready at https://underwrite.echargeup.com${server.graphqlPath}`
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
