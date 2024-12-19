import { gql } from "graphql-tag";
import { vehicleResolvers, vehicleTypeDefs } from "../vehicle-SR.js";
import { creditResolvers, creditTypeDefs } from "../credit-SR.js";
import { riskTypeDefs, riskResolvers } from "../risk-SR.js";
import { dashboardTypeDefs, dashboardResolvers } from "../dashboard-SR.js";
import { onboardedTypeDefs, onboardedResolvers } from "../onboarded-SR.js";
import { driverTypeDefs, driverResolvers } from "../driver-SR.js";
import {
  searchDriversTypeDefs,
  searchDriversResolvers,
} from "../searchDrivers-SR.js";
import {
  onboardedRiskTypeDefs,
  onboardedRiskResolvers,
} from "../onboardedRisk-SR.js";
import {
  businessInsightsTypeDefs,
  businessInsightsResolvers,
} from "../businessInsights-SR.js";

const typeDefs = gql`
  ${vehicleTypeDefs}
  ${creditTypeDefs}
  ${riskTypeDefs}
  ${dashboardTypeDefs}
  ${onboardedTypeDefs}
  ${driverTypeDefs}
  ${businessInsightsTypeDefs}
  ${onboardedRiskTypeDefs}
  ${searchDriversTypeDefs}
`;

const resolvers = {
  Query: {
    vehicle: vehicleResolvers.Query.vehicle,
    credit: creditResolvers.Query.credit,
    risk: riskResolvers.Query.risk,
    dashboard: dashboardResolvers.Query.dashboard,
    onboarded: onboardedResolvers.Query.onboarded,
    driver: driverResolvers.Query.driver,
    businessInsights: businessInsightsResolvers.Query.businessInsights,
    onboardedRisk: onboardedRiskResolvers.Query.onboardedRisk,
    searchDrivers: searchDriversResolvers.Query.searchDrivers,
  },
};

export { typeDefs, resolvers };
