import { gql } from "graphql-tag";
import { vehicleResolvers, vehicleTypeDefs } from "../Vehicle-SR.js";

const typeDefs = gql`
  ${vehicleTypeDefs}
`;

const resolvers = {
  Query: {
    vehicle: vehicleResolvers.Query.vehicle,
  },
};

export { typeDefs, resolvers };
