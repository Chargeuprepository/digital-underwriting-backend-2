import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getSheetData: [SheetData]
  }

  type SheetData {
    id: ID
    name: String
    value: Float
  }
`;
