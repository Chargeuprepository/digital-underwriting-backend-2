import { gql } from "apollo-server-express";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";

export const onboardedRiskTypeDefs = gql`
  type Query {
    onboardedRisk(input: OnboardedRiskInput): DriverDetails
  }
  input OnboardedRiskInput {
    id: String
  }
  type DriverDetails {
    riskScore: String
    digital: Digital
    identity: Identity
    social: Social
    telecom: Telecom
  }
  type Digital {
    digitalFootprint: String
    affluenceScore: Float
    digitalPaymentScore: Float
    vpa: String
  }
  type Identity {
    identityConfidence: String
    phoneFootprint: String
    digitalAge: Float
    nameMatchScore: Float
  }
  type Social {
    socialFootprint: String
    socialMediaScore: Float
    socialMediaCount: Float
    ecommerceScore: Float
  }
  type Telecom {
    telecomRisk: String
    isPhoneReachable: String
    billing: String
    portHistory: String
  }
`;

export const onboardedRiskResolvers = {
  Query: {
    onboardedRisk: async (_, { input }) => {
      console.log(input);
      const drivers = await sheetCallRedis(process.env.REDIS_DRIVER);

      const driverData = drivers.find(
        (driver) => driver.CreatedID === input.id
      );

      console.log(driverData);

      let data = {
        riskScore: driverData.riskScore,
        digital: {
          digitalFootprint: driverData.digitalFootprint,
          affluenceScore: driverData.affluenceScore,
          digitalPaymentScore: driverData.digitalPaymentScore,
          vpa: driverData.vpa,
        },
        identity: {
          identityConfidence: driverData.identityConfidence,
          phoneFootprint: driverData.phoneFootprint,
          digitalAge: driverData.digitalage,
          nameMatchScore: driverData.phoneNameMatchScore,
        },
        social: {
          socialFootprint: socialFootprint(+driverData.socialFootprintScore),
          socialMediaScore: driverData.socialScore,
          socialMediaCount: socialMediaCount(driverData),
          ecommerceScore: driverData.ecommerceScore,
        },
        telecom: {
          telecomRisk: driverData.telecomRisk,
          isPhoneReachable: driverData.phoneReachable,
          billing: driverData.phoneNetwork,
          portHistory: driverData.portingHistory,
        },
      };

      //   console.log(data);

      return data;
    },
  },
};

function socialMediaCount(data) {
  // List of social media keys to check
  const socialMediaKeys = [
    "amazon",
    "flipkart",
    "whatsapp",
    "waBusiness",
    "instagram",
    "paytm",
  ];

  // Filter and count the ones with the value "Account Found"
  const accountFoundCount = socialMediaKeys.reduce((count, key) => {
    return count + (data[key] === "Account Found" ? 1 : 0);
  }, 0);

  return accountFoundCount;
}

function socialFootprint(score) {
  if (score <= 400) return "low";
  else if (score > 400 && score <= 650) return "medium";
  else if (score > 650) return "high";
}
