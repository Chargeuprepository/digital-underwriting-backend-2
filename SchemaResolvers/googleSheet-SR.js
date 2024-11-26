import { gql } from "apollo-server-express";
import googleSheetRedis from "../RedisActions/googleSheetRedis.js";

export const googleSheetTypeDefs = gql`
  type Query {
    googleSheet: Boolean
  }
`;

export const googleSheetResolvers = {
  Query: {
    googleSheet: async (_, {}) => {
      const googleSheetData = await googleSheetRedis();
      // console.log(googleSheetData);

      return true;
    },
  },
};
