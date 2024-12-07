import { gql } from "apollo-server-express";
import { calculateRiskCreditKarmaDashboard } from "../Helper/calculateRiskCreditKarmaDashboard.js";
import { calculateRunKm } from "../Helper/calculateRunKm.js";
import { calculateSixMonthDrivers } from "../Helper/calculateSixMonthDrivers.js";
import { calculateEMITrends } from "../Helper/calculateEMITrends.js";
import { calculateChurnedDrivers } from "../Helper/calculateChurnedDrivers.js";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";

export const dashboardTypeDefs = gql`
  type Query {
    dashboard: DashboardData
  }

  type DashboardData {
    totalDrivers: Float
    runKmData: [RunKmMonthData]
    riskCreditkarmaData: RiskCreditkarmaData
    lastSixMonthDrivers: [MonthAndCount]
    emiTrendsData: EmiTrendsData
    churnedDriversData: [ChurnedDriversData]
  }

  type RunKmMonthData {
    name: String
    data: [String]
  }

  type RiskCreditkarmaData {
    creditVsRisk: CreditVsRisk
    creditVsKarma: CreditVsKarma
  }

  type CreditVsRisk {
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

  type CreditVsKarma {
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
    count: Float
  }
  type EmiTrendsData {
    emiOnTime: String
    emiTrends: [EmiValueName]
  }
  type EmiValueName {
    value: Float
    name: String
  }
  type ChurnedDriversData {
    month: String
    count: Float
  }
`;

export const dashboardResolvers = {
  Query: {
    dashboard: async (_) => {
      const dashboardData = await sheetCallRedis(process.env.REDIS_DASHBOARD);

      // console.log(dashboardData);
      const driversWithCredit = dashboardData.filter(
        (driver) => driver.creditScore > 0
      );

      const dashboardManipulatedData = {
        totalDrivers: dashboardData.length,
        runKmData: calculateRunKm(dashboardData),
        riskCreditkarmaData:
          calculateRiskCreditKarmaDashboard(driversWithCredit),
        lastSixMonthDrivers: calculateSixMonthDrivers(dashboardData),
        emiTrendsData: calculateEMITrends(dashboardData),
        churnedDriversData: calculateChurnedDrivers(dashboardData),
      };

      return dashboardManipulatedData;
    },
  },
};
