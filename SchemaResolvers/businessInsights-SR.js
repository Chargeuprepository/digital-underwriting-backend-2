import { gql } from "apollo-server-express";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";
import { calculateBusinessInsights } from "../Helper/calculateBusinessInsights.js";
import { creditRiskKarmaZoneFilter } from "../Helper/creditRiskKarmaZoneFilter.js";

export const businessInsightsTypeDefs = gql`
  type Query {
    businessInsights(input: BusinessInsightsInput): BusinessInsightsData
  }
  input BusinessInsightsInput {
    credit: String
    risk: String
    zone: [String]
  }
  type BusinessInsightsData {
    avgCredit: String
    resultRange: ResultRange
    vehicleFinanced: VehicleFinanced
    identityConfidence: IdentityConfidence
    phoneNameMatchScore: PhoneNameMatchScore
    driversUsingUpi: DriversUsingUpi
    digitalFootprint: DigitalFootprint
    socialFootprint: SocialFootprint
    socialMediaPlatform: SocialMediaPlatform
    phoneFootprint: PhoneFootprint
    digitalAge: DigitalAge
    phoneNetwork: PhoneNetwork
    uniqueCities: [String]
  }
  type ResultRange {
    lowCreditPercentage: String
    mediumCreditPercentage: String
    highCreditPercentage: String
  }
  type VehicleFinanced {
    yes: String
    no: String
  }
  type IdentityConfidence {
    high: String
    medium: String
    low: String
  }
  type PhoneNameMatchScore {
    high: String
    medium: String
    low: String
  }
  type DriversUsingUpi {
    yes: String
    no: String
  }
  type DigitalFootprint {
    high: String
    medium: String
    low: String
  }
  type SocialFootprint {
    high: String
    medium: String
    low: String
  }
  type SocialMediaPlatform {
    amazon: String
    whatsapp: String
    waBusiness: String
    instagram: String
    flipkart: String
    paytm: String
  }
  type PhoneFootprint {
    high: String
    medium: String
    low: String
  }
  type DigitalAge {
    high: String
    medium: String
    low: String
  }
  type PhoneNetwork {
    prepaid: String
    postpaid: String
  }
`;

export const businessInsightsResolvers = {
  Query: {
    businessInsights: async (_, { input }) => {
      console.log(input);
      const { credit, risk, zone } = input;
      // 1. Getting all Drivers
      const businessInsightsData = await sheetCallRedis(
        process.env.REDIS_BUSINESS_INSIGHTS
      );

      // 2. Filtering drivers on Risk, Credit and Zone
      const filteredData = creditRiskKarmaZoneFilter(businessInsightsData, {
        credit,
        risk,
        zone,
      });
      console.log(filteredData[0]);

      // 3. Calculating the Insights Data from filteres drivers
      let data = calculateBusinessInsights(filteredData);

      return data;
    },
  },
};
