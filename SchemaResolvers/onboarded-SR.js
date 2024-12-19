import { gql } from "apollo-server-express";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";
import { creditRiskKarmaZoneFilter } from "../Helper/creditRiskKarmaZoneFilter.js";
import redisClient from "../redisClient.js";

export const onboardedTypeDefs = gql`
  type Query {
    onboarded(input: OnboardedInput): DriverData
  }
  input OnboardedInput {
    limit: Int
    offset: Int
    credit: String
    risk: String
    karma: String
    searchId: String
  }
  type DriverData {
    error: Error
    data: Data
  }
  type Error {
    status: Int
    message: String
  }
  type Data {
    length: String
    onboardedManipulatedData: [OnboardedManipulatedData]
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

export const onboardedResolvers = {
  Query: {
    onboarded: async (_, { input }) => {
      let { limit = 20, offset = 0, credit, risk, karma, searchId } = input;

      const cachedFilteredCombinationData = await redisClient.get(
        `CREDIT_${credit}_RISK_${risk}_KARMA_${karma}`
      );
      const response = JSON.parse(cachedFilteredCombinationData);

      let data;
      let onboardedManipulatedData = [];
      let driverData = {};
      let error = {};
      if (!response) {
        // 1. Getting all drivers
        const onboardedData = await sheetCallRedis();

        if (onboardedData.error === null && onboardedData.data) {
          // 2. Filtering drivers on credit, risk and karma
          data = creditRiskKarmaZoneFilter(onboardedData.data, {
            credit,
            risk,
            karma,
            searchId,
          });

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
            row.credit = Number(data[i].creditScore);
            row.risk = Number(data[i].riskScore).toFixed(0);

            onboardedManipulatedData.push(row);
          }

          // 3. Structuring the data accordingly
          driverData.onboardedManipulatedData = onboardedManipulatedData.sort(
            (a, b) => b.credit - a.credit
          );

          await redisClient.setEx(
            `CREDIT_${credit}_RISK_${risk}_KARMA_${karma}`,
            3600 * 24,
            JSON.stringify(driverData)
          );
        } else if (onboardedData.error && onboardedData.data === null) {
          error.status = onboardedData.error.status || 401;
          error.message = onboardedData.error.message || "Bad Request";
        } else if (onboardedData.data === null) {
          error.status = onboardedData.error.status || 401;
          error.message = onboardedData.error.message || "Bad Request";
        }
      }

      // 4. Handling Error State
      if (error.status && error.message) {
        return { data: null, error };
      }

      // 5. Paginating the drivers
      return response
        ? {
            error: null,
            data: {
              length: response.onboardedManipulatedData.length,
              onboardedManipulatedData: response.onboardedManipulatedData.slice(
                offset,
                offset + limit
              ),
            },
          }
        : {
            error: null,
            data: {
              length: onboardedManipulatedData.length,
              onboardedManipulatedData:
                driverData.onboardedManipulatedData.slice(
                  offset,
                  offset + limit
                ),
            },
          };
    },
  },
};
