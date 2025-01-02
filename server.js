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
import https from "https";
import fs from "fs";
import { ApolloServer } from "apollo-server-express";
import {
  typeDefs,
  resolvers,
} from "./SchemaResolvers/ParentFolder-SRs/Parent-SR.js";
import redisClient from "./redisClient.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Middleware to force HTTPS redirect
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
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

    // Load SSL certificates
    const privateKey = fs.readFileSync(
      "/etc/letsencrypt/live/underwrite.echargeup.com/privkey.pem",
      "utf8"
    );
    const certificate = fs.readFileSync(
      "/etc/letsencrypt/live/underwrite.echargeup.com/cert.pem",
      "utf8"
    );
    const ca = fs.readFileSync(
      "/etc/letsencrypt/live/underwrite.echargeup.com/chain.pem",
      "utf8"
    );

    const credentials = { key: privateKey, cert: certificate, ca };

    // Start HTTPS server
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(443, () => {
      console.log("🚀 Server is running on https://underwrite.echargeup.com");
    });
  } catch (error) {
    console.error("Critical server error:", error);
    process.exit(1);
  }
};

startServer();
