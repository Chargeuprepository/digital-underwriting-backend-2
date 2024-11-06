import { gql } from "graphql-tag";
import { vehicleResolvers, vehicleTypeDefs } from "../vehicle-SR.js";
import { creditResolvers, creditTypeDefs } from "../credit-SR.js";

const typeDefs = gql`
  ${vehicleTypeDefs}
  ${creditTypeDefs}
`;

const resolvers = {
  Query: {
    vehicle: vehicleResolvers.Query.vehicle,
    credit: creditResolvers.Query.credit,
  },
};

export { typeDefs, resolvers };
