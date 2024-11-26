import { gql } from "apollo-server-express";
import creditAPI from "../APIs/creditAPI.js";
import dateFormat from "../Helper/dateFormat.js";

export const creditTypeDefs = gql`
  type Query {
    credit(input: ApplicantInput!): CreditData
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
  type CreditData {
    requestId: String
    statusCode: Int
    timestamp: Float
    INProfileResponse: INProfileResponse
  }

  type INProfileResponse {
    header: Header
    hero: Hero
    accountSummary: AccountSummary
    personalDetails: PersonalDetails
    applicationDetails: ApplicationDetails
    capsSummary: CapsSummary
    otherDetails: OtherDetails
  }
  type Header {
    name: String
    mobile: String
  }
  type Hero {
    creditScore: Int
    outstandingBalance: Int
    accountsActive: Int
    accountsDefault: Int
  }
  type PersonalDetails {
    dateOfBirth: String
    firstName: String
    genderCode: Int
    PANNumber: String
    lastName: String
    mobile: String
  }
  type ApplicationDetails {
    amountFinanced: Int
    buildingSociety: String
    city: String
    countryCode: String
    flatPlotHouseNumber: String
    landmark: String
    pinCode: String
    roadAreaLocality: String
    state: Int
  }
  type CapsSummary {
    capsLast180Days: Int
    capsLast90Days: Int
    capsLast30Days: Int
    capsLast7Days: Int
    nonCreditCapsLast180Days: Int
    nonCreditCapsLast90Days: Int
    nonCreditCapsLast30Days: Int
    nonCreditCapsLast7Days: Int
    totalCapsLast180Days: Int
    totalCapsLast90Days: Int
    totalCapsLast30Days: Int
    totalCapsLast7Days: Int
  }
  type OtherDetails {
    employmentStatus: String
    income: Int
    maritalStatus: String
    numberOfMajorCreditCardHeld: Int
    policy: String
    timeWithEmployer: String
  }
  type AccountSummary {
    creditScore: Int
    cadSuitFiledCurrentBalance: Int
    creditAccountActive: Int
    creditAccountClosed: Int
    creditAccountDefault: Int
    creditAccountTotal: Int
    outstandingBalanceAll: Int
    outstandingBalanceSecured: Int
    outstandingBalanceUnsecured: Int
  }
`;

export const creditResolvers = {
  Query: {
    credit: async (_, { input }) => {
      // console.log(input);
      const creditData = await creditAPI(input);
      // console.log(creditData);
      // const applicantDetails =
      //   creditData.processReturn.INProfileResponse.Current_Application
      //     .Current_Application_Details.Current_Applicant_Details;
      // const CAISSummary =
      //   creditData.processReturn.INProfileResponse.CAIS_Account.CAIS_Summary;
      // const applicationDetails =
      //   creditData.processReturn.INProfileResponse.Current_Application
      //     .Current_Application_Details.Current_Applicant_Address_Details;
      // const caps = creditData.processReturn.INProfileResponse.CAPS.CAPS_Summary;
      // const nonCreditCaps =
      //   creditData.processReturn.INProfileResponse.NonCreditCAPS
      //     .NonCreditCAPS_Summary;
      // const capsSummary =
      //   creditData.processReturn.INProfileResponse.TotalCAPS_Summary;
      // const currentApplicationDetails =
      //   creditData.processReturn.INProfileResponse.Current_Application
      //     .Current_Application_Details.Current_Other_Details;
      // const creditAccount =
      //   creditData.processReturn.INProfileResponse.CAIS_Account.CAIS_Summary
      //     .Credit_Account;
      // const totalOutstandingBalance =
      //   creditData.processReturn.INProfileResponse.CAIS_Account.CAIS_Summary
      //     .Total_Outstanding_Balance;

      // return {
      //   requestId: creditData.requestId,
      //   statusCode: creditData.statusCode,
      //   timestamp: creditData.timestamp,
      //   INProfileResponse: {
      //     header: {
      //       name: `${applicantDetails.First_Name}${" "}${
      //         applicantDetails.Last_Name
      //       }`,
      //       mobile: applicantDetails.MobilePhoneNumber,
      //     },
      //     hero: {
      //       creditScore:
      //         creditData.processReturn.INProfileResponse.SCORE.BureauScore,
      //       outstandingBalance:
      //         CAISSummary.Total_Outstanding_Balance.Outstanding_Balance_All,
      //       accountsActive: CAISSummary.Credit_Account.CreditAccountActive,
      //       accountsDefault: CAISSummary.Credit_Account.CreditAccountDefault,
      //     },
      //     personalDetails: {
      //       dateOfBirth: dateFormat(applicantDetails.Date_Of_Birth_Applicant),
      //       firstName: applicantDetails.First_Name,
      //       genderCode: applicantDetails.Gender_Code,
      //       PANNumber: applicantDetails.IncomeTaxPan,
      //       lastName: applicantDetails.Last_Name,
      //       mobile: applicantDetails.MobilePhoneNumber,
      //     },
      //     applicationDetails: {
      //       amountFinanced:
      //         creditData.processReturn.INProfileResponse.Current_Application
      //           .Current_Application_Details.Amount_Financed,
      //       buildingSociety: applicationDetails.BldgNoSocietyName,
      //       city: applicationDetails.city,
      //       countryCode: applicationDetails.Country_Code,
      //       flatPlotHouseNumber: applicationDetails.FlatNoPlotNoHouseNo,
      //       landmark: applicationDetails.Landmark,
      //       pinCode: applicationDetails.PINCode,
      //       roadAreaLocality: applicationDetails.RoadNoNameAreaLocality,
      //       state: applicationDetails.State,
      //     },
      //     capsSummary: {
      //       capsLast180Days: caps.CAPSLast180Days,
      //       capsLast90Days: caps.CAPSLast90Days,
      //       capsLast30Days: caps.CAPSLast30Days,
      //       capsLast7Days: caps.CAPSLast7Days,
      //       nonCreditCapsLast180Days: nonCreditCaps.NonCreditCAPSLast180Days,
      //       nonCreditCapsLast90Days: nonCreditCaps.NonCreditCAPSLast90Days,
      //       nonCreditCapsLast30Days: nonCreditCaps.NonCreditCAPSLast30Days,
      //       nonCreditCapsLast7Days: nonCreditCaps.NonCreditCAPSLast7Days,
      //       totalCapsLast180Days: capsSummary.TotalCAPSLast180Days,
      //       totalCapsLast90Days: capsSummary.TotalCAPSLast90Days,
      //       totalCapsLast30Days: capsSummary.TotalCAPSLast30Days,
      //       totalCapsLast7Days: capsSummary.TotalCAPSLast7Days,
      //     },
      //     otherDetails: {
      //       employmentStatus: currentApplicationDetails.Employment_Status,
      //       income: currentApplicationDetails.Income,
      //       maritalStatus: currentApplicationDetails.Marital_Status,
      //       numberOfMajorCreditCardHeld:
      //         currentApplicationDetails.Number_of_Major_Credit_Card_Held,
      //       policy: currentApplicationDetails.Policy,
      //       timeWithEmployer: currentApplicationDetails.Time_with_Employer,
      //     },
      //     accountSummary: {
      //       creditScore:
      //         creditData.processReturn.INProfileResponse.SCORE.BureauScore,
      //       cadSuitFiledCurrentBalance:
      //         creditAccount.CADSuitFiledCurrentBalance,
      //       creditAccountActive: creditAccount.CreditAccountActive,
      //       creditAccountClosed: creditAccount.CreditAccountClosed,
      //       creditAccountDefault: creditAccount.CreditAccountDefault,
      //       creditAccountTotal: creditAccount.CreditAccountTotal,
      //       outstandingBalanceAll:
      //         totalOutstandingBalance.Outstanding_Balance_All,
      //       outstandingBalanceSecured:
      //         totalOutstandingBalance.Outstanding_Balance_Secured,
      //       outstandingBalanceUnsecured:
      //         totalOutstandingBalance.Outstanding_Balance_UnSecured,
      //     },
      //   },
      // };
    },
  },
};
