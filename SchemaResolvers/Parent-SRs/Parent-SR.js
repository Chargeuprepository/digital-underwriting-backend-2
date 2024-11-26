import { gql } from "graphql-tag";
import { vehicleResolvers, vehicleTypeDefs } from "../vehicle-SR.js";
import { creditResolvers, creditTypeDefs } from "../credit-SR.js";
import { riskTypeDefs, riskResolvers } from "../risk-SR.js";
import {
  googleSheetTypeDefs,
  googleSheetResolvers,
} from "../googleSheet-SR.js";
import { dashboardTypeDefs, dashboardResolvers } from "../dashboard-SR.js";

const typeDefs = gql`
  ${vehicleTypeDefs}
  ${creditTypeDefs}
  ${riskTypeDefs}
  ${googleSheetTypeDefs}
  ${dashboardTypeDefs}
`;

const resolvers = {
  Query: {
    vehicle: vehicleResolvers.Query.vehicle,
    credit: creditResolvers.Query.credit,
    risk: riskResolvers.Query.risk,
    googleSheet: googleSheetResolvers.Query.googleSheet,
    dashboard: dashboardResolvers.Query.dashboard,
  },
};

export { typeDefs, resolvers };
