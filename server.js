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
// import cors from "cors";
// import redisClient from "./redisClient.js";
// import bodyParser from "body-parser";

// app.use(bodyParser.json());

// app.use(cors());

// app.use("/testDriver", async (req, res) => {
//   const key = "drivers_data_temporary";
//   const cachedData = await redisClient.get(key);

//   if (cachedData) {
//     console.log("Serving from Redis cache key: drivers_data_temporary");
//     const data = JSON.parse(cachedData);
//     return res.json(data);
//   }

//   const response = await fetch(
//     "https://script.google.com/macros/s/AKfycbyAX63oCVNXWN-SUFoPvCAkK9tJMbLNG_hfY2i23qJtcsAeNXywJ64zfvE5Jc3BrHRC8Q/exec"
//   );
//   const data = await response.json();
//   await redisClient.setEx(key, 3600 * 24, JSON.stringify(data));
//   return res.json(data);
// });

// app.use("/driver", async (req, res) => {
//   const driverId = req.body.CreatedID;

//   // Fetch the data from Redis
//   const data = await redisClient.get("drivers_data_temporary");

//   // Parse the data
//   const drivers = JSON.parse(data);

//   // Find the driver with the matching ID
//   const driver = drivers.find((d) => d.CreatedID === driverId);

//   if (!driver) {
//     return res.status(404).json({ error: "Driver not found" });
//   }

//   // Send the driver data
//   return res.json(driver);
// });

// app.listen(8080, (req, res) => {
//   console.log("listening on 8080");
// });
