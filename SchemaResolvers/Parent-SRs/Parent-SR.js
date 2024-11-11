import { gql } from "graphql-tag";
import { vehicleResolvers, vehicleTypeDefs } from "../vehicle-SR.js";
import { creditResolvers, creditTypeDefs } from "../credit-SR.js";
import { riskTypeDefs, riskResolvers } from "../risk-SR.js";

const typeDefs = gql`
  ${vehicleTypeDefs}
  ${creditTypeDefs}
  ${riskTypeDefs}
`;

const resolvers = {
  Query: {
    vehicle: vehicleResolvers.Query.vehicle,
    credit: creditResolvers.Query.credit,
    risk: riskResolvers.Query.risk,
  },
};

export { typeDefs, resolvers };
