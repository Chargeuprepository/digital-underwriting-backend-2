import { gql } from "apollo-server-express";
import dashboardRedis from "../RedisActions/dashboardRedis.js";
import { calculateRiskCreditKarmaDashboard } from "../Helper/calculateRiskCreditKarmaDashboard.js";
import { calculateRunKm } from "../Helper/calculateRunKm.js";
import { calculateSixMonthDrivers } from "../Helper/calculateSixMonthDrivers.js";
import { calculateEMITrends } from "../Helper/calculateEMITrends.js";
import { calculateChurnedDrivers } from "../Helper/calculateChurnedDrivers.js";

export const dashboardTypeDefs = gql`
  type Query {
    dashboard: DashboardData
  }

  type DashboardData {
    totalDrivers: Int
    runKmData: [RunKmMonthData]
    riskCreditkarmaData: [CreditRiskKarma] # Using a union type for the field
    lastSixMonthDrivers: [MonthAndCount]
    emiTrendsData: EmiTrendsData
    churnedDriversData: [ChurnedDriversData]
  }

  type RunKmMonthData {
    month: String
    percentages: [String]
  }

  union CreditRiskKarma = CreditRisk | CreditKarma # Define the union type
  type CreditRisk {
    CreditHighRiskHigh: String
    CreditHighRiskMedium: String
    CreditHighRiskLow: String
    CreditMediumRiskHigh: String
    CreditMediumRiskMedium: String
    CreditMediumRiskLow: String
    CreditLowRiskHigh: String
    CreditLowRiskMedium: String
    CreditLowRiskLow: String
  }

  type CreditKarma {
    CreditHighKarmaHigh: String
    CreditHighKarmaMedium: String
    CreditHighKarmaLow: String
    CreditMediumKarmaHigh: String
    CreditMediumKarmaMedium: String
    CreditMediumKarmaLow: String
    CreditLowKarmaHigh: String
    CreditLowKarmaMedium: String
    CreditLowKarmaLow: String
  }
  type MonthAndCount {
    month: String
    count: Int
  }
  type EmiTrendsData {
    emiOnTime: String
    emiTrends: [EmiValueName]
  }
  type EmiValueName {
    value: Int
    name: String
  }
  type ChurnedDriversData {
    month: String
    count: Int
  }
`;

export const dashboardResolvers = {
  Query: {
    dashboard: async (_) => {
      const dashboardData = await dashboardRedis();

      // console.log(dashboardData);

      const data = {
        // CreatedID: "FB1759",
        // Onboarding_Date: "12-Aug-24",
        // riskScore: "418",
        // creditScore: "",
        // karma: "517.2872",
        // runKm: "55",
        avgDPD: "203",
        lossDays: "",
        churnedDate: "",
        // lastRunKm: "55",
        // secondLastRunKm: "60",
        // thirdLastRunKm: "39",
      };

      const dashboardManipulatedData = {
        totalDrivers: dashboardData.length,
        runKmData: calculateRunKm(dashboardData),
        riskCreditkarmaData: calculateRiskCreditKarmaDashboard(dashboardData),
        lastSixMonthDrivers: calculateSixMonthDrivers(dashboardData),
        emiTrendsData: calculateEMITrends(dashboardData),
        churnedDriversData: calculateChurnedDrivers(dashboardData),
      };

      // console.log(calculateChurnedDrivers(dashboardData));

      return dashboardManipulatedData;
    },
  },
};
