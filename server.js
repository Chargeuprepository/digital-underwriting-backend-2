import express from "express";
// import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./SchemaResolvers/Parent-SRs/parent-SR.js";

export const app = express();
// app.use(bodyParser.json());
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});

// import { app } from "./app.js";

// import axios from "axios";
// import https from "https";

// app.use("/riskScore", async (req, res) => {
//   console.log(req.body);
//   const url = "https://api.sandbox.bureau.id/transactions";
//   const options = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Basic NzZmYjczMzctOWJiYy00YTA4LWE2ZGEtNTQxZGNiYzBhY2UwOjk3OGJhYWE3LWY3YzctNGQ0Yy05ZTcyLTJlODI1NmJmZGQ1Yw==",
//     },
//     httpsAgent: new https.Agent({
//       rejectUnauthorized: false,
//     }),
//   };

//   let apiInput = {
//     workflowId: "f3009b74-f67c-479c-b493-122be98ca20b",
//     data: {
//       countryCode: "IND",
//       // email: input.email,
//       phoneNumber: req.body.phoneNumber,
//       name: req.body.name,
//       derivedSignals: true,
//       enhancedCoverage: true,
//     },
//   };
//   const response1 = await axios
//     .post(url, apiInput, options)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       return error;
//     });
//   res.json({ data: response1.data });
// });

// app.listen(8000, (req, res) => {
//   console.log("server is listening at port 8000");
// });
