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
    error: Error
    settingGoogleSheetDataInfo: SettingGoogleSheetDataInfo
    gettingGoogleSheetDataInfo: Error
    data: Data
  }

  type SettingGoogleSheetDataInfo {
    dataSet: Boolean
    error: Error
  }

  type Error {
    status: Int
    message: String
  }

  type Data {
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
      const dashboardData = await sheetCallRedis();

      if (dashboardData.error === null && dashboardData.data) {
        const driversWithCredit = dashboardData.data.filter(
          (driver) => driver.creditScore > 0
        );

        const dashboardManipulatedData = {
          totalDrivers: dashboardData.data.length,
          runKmData: calculateRunKm(dashboardData.data),
          riskCreditkarmaData:
            calculateRiskCreditKarmaDashboard(driversWithCredit),
          lastSixMonthDrivers: calculateSixMonthDrivers(dashboardData.data),
          emiTrendsData: calculateEMITrends(dashboardData.data),
          churnedDriversData: calculateChurnedDrivers(dashboardData.data),
        };

        return {
          error: null,
          settingGoogleSheetDataInfo: dashboardData.settingGoogleSheetDataInfo,
          gettingGoogleSheetDataInfo: dashboardData.gettingGoogleSheetDataInfo,
          data: dashboardManipulatedData,
        };
      } else if (dashboardData.data === null) {
        return { error: dashboardData.error, data: null };
      } else {
        return { error: { status: 401, message: "Bad Request" }, data: null };
      }
    },
  },
};
