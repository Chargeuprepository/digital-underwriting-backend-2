import { gql } from "apollo-server-express";
import creditAPI from "../APIs/creditAPI.js";

export const creditTypeDefs = gql`
  type Query {
    credit(input: ApplicantInput!): ProcessReturn
  }

  input ApplicantInput {
    firstName: String!
    lastName: String!
    genderCode: String!
    pan: String!
    mobile: String!
    dateOfBirth: String!
    addressLine1: String!
    addressLine2: String
    city: String!
    state: String!
    pinCode: String!
  }
  type ProcessReturn {
    INProfileResponse: INProfileResponse
    requestId: String
    statusCode: Int
    timestamp: Float
  }

  type INProfileResponse {
    CAIS_Account: CAISAccount
    CAPS: CAPS
    CreditProfileHeader: CreditProfileHeader
    Current_Application: CurrentApplication
    Header: Header
    Match_result: MatchResult
    NonCreditCAPS: NonCreditCAPS
    SCORE: Score
    TotalCAPS_Summary: TotalCAPS
    UserMessage: UserMessage
  }

  type CAISAccount {
    CAIS_Summary: CAISSummary
  }

  type CAISSummary {
    Credit_Account: CreditAccount
    Total_Outstanding_Balance: OutstandingBalance
  }

  type CreditAccount {
    CADSuitFiledCurrentBalance: Int
    CreditAccountActive: Int
    CreditAccountClosed: Int
    CreditAccountDefault: Int
    CreditAccountTotal: Int
  }

  type OutstandingBalance {
    Outstanding_Balance_All: Int
    Outstanding_Balance_Secured: Int
    Outstanding_Balance_Secured_Percentage: Int
    Outstanding_Balance_UnSecured: Int
    Outstanding_Balance_UnSecured_Percentage: Int
  }

  type CAPS {
    CAPS_Summary: CAPSSummary
  }

  type CAPSSummary {
    CAPSLast180Days: Int
    CAPSLast30Days: Int
    CAPSLast7Days: Int
    CAPSLast90Days: Int
  }

  type CreditProfileHeader {
    CustomerReferenceID: String
    Enquiry_Username: String
    ReportDate: Int
    ReportNumber: Float
    ReportTime: Int
    Subscriber: String
    Subscriber_Name: String
    Version: String
  }

  type CurrentApplication {
    Current_Application_Details: CurrentApplicationDetails
  }

  type CurrentApplicationDetails {
    Amount_Financed: Int
    Current_Applicant_Additional_AddressDetails: String
    Current_Applicant_Address_Details: AddressDetails
    Current_Applicant_Details: ApplicantDetails
    Current_Other_Details: OtherDetails
    Duration_Of_Agreement: Int
    Enquiry_Reason: Int
    Finance_Purpose: Int
  }

  type AddressDetails {
    BldgNoSocietyName: String
    City: String
    Country_Code: String
    FlatNoPlotNoHouseNo: String
    Landmark: String
    PINCode: Int
    RoadNoNameAreaLocality: String
    State: Int
  }

  type ApplicantDetails {
    Date_Of_Birth_Applicant: Int
    Driver_License_Expiration_Date: String
    Driver_License_Issue_Date: String
    Driver_License_Number: String
    EMailId: String
    First_Name: String
    Gender_Code: Int
    IncomeTaxPan: String
    Last_Name: String
    Middle_Name1: String
    Middle_Name2: String
    Middle_Name3: String
    MobilePhoneNumber: String
    PAN_Expiration_Date: String
    PAN_Issue_Date: String
    Passport_Expiration_Date: String
    Passport_Issue_Date: String
    Passport_Number: String
    Ration_Card_Expiration_Date: String
    Ration_Card_Issue_Date: String
    Ration_Card_Number: String
    Telephone_Extension: String
    Telephone_Number_Applicant_1st: Int
    Telephone_Type: String
    Universal_ID_Expiration_Date: String
    Universal_ID_Issue_Date: String
    Universal_ID_Number: String
    Voter_ID_Expiration_Date: String
    Voter_ID_Issue_Date: String
    Voter_s_Identity_Card: String
  }

  type OtherDetails {
    Employment_Status: String
    Income: Int
    Marital_Status: String
    Number_of_Major_Credit_Card_Held: Int
    Policy: String
    Time_with_Employer: String
  }

  type Header {
    MessageText: String
    ReportDate: Int
    ReportTime: Int
    SystemCode: Int
  }

  type MatchResult {
    Exact_match: String
  }

  type NonCreditCAPS {
    NonCreditCAPS_Summary: NonCreditCAPSSummary
  }

  type NonCreditCAPSSummary {
    NonCreditCAPSLast180Days: Int
    NonCreditCAPSLast30Days: Int
    NonCreditCAPSLast7Days: Int
    NonCreditCAPSLast90Days: Int
  }

  type Score {
    BureauScore: Int
    BureauScoreConfidLevel: String
  }

  type TotalCAPS {
    TotalCAPSLast180Days: Int
    TotalCAPSLast30Days: Int
    TotalCAPSLast7Days: Int
    TotalCAPSLast90Days: Int
  }

  type UserMessage {
    UserMessageText: String
  }
`;

export const creditResolvers = {
  Query: {
    credit: async (_, { input }) => {
      const creditData = await creditAPI(input);
      return {
        INProfileResponse: creditData.processReturn.INProfileResponse,
        requestId: creditData.requestId,
        statusCode: creditData.statusCode,
        timestamp: creditData.timestamp,
      };
    },
  },
};
