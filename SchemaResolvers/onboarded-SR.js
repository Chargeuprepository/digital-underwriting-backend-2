import { gql } from "apollo-server-express";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";
import { creditRiskKarmaZoneFilter } from "../Helper/creditRiskKarmaZoneFilter.js";
import redisClient from "../redisClient.js";

export const onboardedTypeDefs = gql`
  type Query {
    onboarded(input: OnboardedInput): [OnboardedManipulatedData]
  }
  input OnboardedInput {
    limit: Int
    offset: Int
    credit: String
    risk: String
    karma: String
    zone: [String]
  }
  type OnboardedManipulatedData {
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
// input OnboardedSortFilterInputs {
//   limit: Int
//   offset: Int
//   order: String
// }

export const onboardedResolvers = {
  Query: {
    onboarded: async (_, { input }) => {
      console.log(input);
      const { limit = 20, offset = 0, credit, risk, karma } = input;
      // const limit = 20;
      // const offset = 0;
      // const credit = "medium";
      // const risk = "low";
      // const karma = "high";

      const cachedFilteredCombinationData = await redisClient.get(
        `CREDIT_${credit}_RISK_${risk}_KARMA_${karma}`
      );
      const response = JSON.parse(cachedFilteredCombinationData);

      // console.log(response);

      let data;
      let onboardedManipulatedData = [];
      if (!response) {
        // 1. Getting all drivers
        const onboardedData = await sheetCallRedis(process.env.REDIS_ONDOARDED);

        // 2. Filtering drivers on credit, risk and karma
        data = creditRiskKarmaZoneFilter(onboardedData, {
          credit,
          // risk,
          // karma,
        });

        // 3. Structuring the data accordingly

        for (let i = 0; i < data.length; i++) {
          let row = {};
          row.id = data[i].CreatedID;
          row.name =
            data[i].OwnerFirstName.toLowerCase() +
            " " +
            data[i].LastName.toLowerCase();
          row.avgDpd = Number(data[i].avgDPD).toFixed(2);
          row.service = data[i].service;
          row.runKm = Number(data[i].runKm).toFixed(0);
          row.nps = Number(data[i].NPS).toFixed(0);
          row.karma = data[i].karmaScore.toFixed(0);
          row.credit = Number(data[i].creditScore).toFixed(0);
          row.risk = Number(data[i].riskScore).toFixed(0);

          onboardedManipulatedData.push(row);
        }

        console.log(onboardedManipulatedData[0]);

        await redisClient.setEx(
          `CREDIT_${credit}_RISK_${risk}_KARMA_${karma}`,
          300 * 24,
          JSON.stringify(onboardedManipulatedData)
        );
      }

      // 4. Paginating the drivers
      return response
        ? response.slice(offset, offset + limit)
        : onboardedManipulatedData.slice(offset, offset + limit);

      return onboardedManipulatedData;
    },
  },
};
