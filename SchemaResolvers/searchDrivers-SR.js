import { gql } from "graphql-tag";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";

export const searchDriversTypeDefs = gql`
  type Query {
    searchDrivers(input: SearchInput!): SearchedDriver
  }
  input SearchInput {
    id: String!
  }
  type SearchedDriver {
    length: Int
    driver: [Driver]
  }
  type Driver {
    id: String
    name: String
    avgDpd: String
    service: String
    runKm: String
    nps: String
    karma: String
    credit: String
    risk: String
  }
`;

export const searchDriversResolvers = {
  Query: {
    searchDrivers: async (_, { input }) => {
      const { id } = input;
      const drivers = await sheetCallRedis();

      const searchedDriver = drivers.filter(
        (driver) => driver.CreatedID === id
      );

      const driver = {
        id: searchedDriver[0].CreatedID,
        name:
          searchedDriver[0].OwnerFirstName.toLowerCase() +
          " " +
          searchedDriver[0].LastName.toLowerCase(),
        avgDpd: Number(searchedDriver[0].avgDPD).toFixed(2),
        service: searchedDriver[0].service,
        runKm: Number(searchedDriver[0].runKm).toFixed(0),
        nps: Number(searchedDriver[0].NPS).toFixed(0),
        karma: searchedDriver[0].karmaScore.toFixed(0),
        credit: Number(searchedDriver[0].creditScore),
        risk: Number(searchedDriver[0].riskScore).toFixed(0),
      };

      return { length: 1, driver: [driver] };
    },
  },
};
