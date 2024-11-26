import { gql } from "apollo-server-express";
import dashboardRedis from "../RedisActions/dashboardRedis.js";

export const dashboardTypeDefs = gql`
  type Query {
    dashboard: Boolean
  }
`;

export const dashboardResolvers = {
  Query: {
    dashboard: async (_) => {
      const dashboardData = await dashboardRedis();
      console.log(dashboardData);

      return true;
    },
  },
};
