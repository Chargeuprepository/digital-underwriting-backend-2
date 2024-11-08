import { gql } from "apollo-server-express";
import riskAPI from "../../APIs/riskAPI.js";

export const riskTypeDefs = gql`
  type Query {
    risk(input: RiskInput!): Transaction
  }

  input RiskInput {
    workflowId: String!
    data: DataInput!
  }
  input DataInput {
    email: String!
    name: String!
    phoneNumber: String!
  }

  type Transaction {
    statusCode: Int
    error: String
    status: String
    timestamp: Float
    transactionId: String
    merchantId: String
    workflowId: String
    workflowName: String
    outcome: String
    transactionTimeline: [TransactionTimelineEntry]
    services: Services
    awaits: Awaits
    outcomeReasons: [String]
    transactionRawInput: TransactionRawInput
    documents: [String]
    devices: [String]
  }

  type TransactionTimelineEntry {
    index: Int
    updatedAt: Float
    updatedBy: String
    outcome: String
    comments: String
  }

  type Services {
    emailNameAttribute: EmailNameAttribute
    emailSocialCombinedReport: EmailSocialCombinedReport
    emailSocialCombinedSubmit: EmailSocialCombinedSubmit
    phoneName: PhoneName
    phoneNameAttribute: PhoneNameAttribute
    phoneNetwork: PhoneNetwork
    phoneSocialCombinedReport: PhoneSocialCombinedReport
    phoneSocialCombinedSubmit: PhoneSocialCombinedSubmit
    riskModel: RiskModel
  }

  type EmailNameAttribute {
    status: String
    response: EmailNameAttributeResponse
  }

  type EmailNameAttributeResponse {
    address: String
    businessNameDetected: Boolean
    ccrp: Boolean
    conditionsEvaluationStatus: Boolean
    digitalage: Int
    emailDigits: Int
    emailFootprintStrength: String
    emailNameDigitalAge: Int
    emailSpclChars: Int
    endTime: Float
    error: String
    firstNameMatch: Boolean
    lastNameMatch: Boolean
    multiplePhoneAttached: Boolean
    nameEmailMatch: Int
    nameMatchScore: Int
    ndrScore: Int
    phoneNumber: Int
    startTime: Float
    status: String
    unrScore: Int
  }

  type EmailSocialCombinedReport {
    status: String
    response: EmailSocialCombinedReportResponse
  }

  type EmailSocialCombinedReportResponse {
    amazon: String
    awaitedOnThis: Boolean
    booking: String
    conditionsEvaluationStatus: Boolean
    email: String
    endTime: Float
    error: String
    facebook: String
    flickr: String
    flipkart: String
    github: String
    housing: String
    instagram: String
    jeevansaathi: String
    microsoft: String
    moneycontrol: String
    paytm: String
    pinterest: String
    quora: String
    referenceId: String
    shaadi: String
    skype: String
    spotify: String
    startTime: Float
    status: String
    toi: String
    wordpress: String
    yatra: String
    zoho: String
  }

  type EmailSocialCombinedSubmit {
    status: String
    response: EmailSocialCombinedSubmitResponse
  }

  type EmailSocialCombinedSubmitResponse {
    conditionsEvaluationStatus: Boolean
    endTime: Float
    error: String
    referenceId: String
    startTime: Float
    status: String
  }

  type PhoneName {
    status: String
    response: PhoneNameResponse
  }

  type PhoneNameResponse {
    ccrp: Boolean
    conditionsEvaluationStatus: Boolean
    endTime: Float
    error: String
    name: String
    source: String
    startTime: Float
    status: String
    vpa: String
  }

  type PhoneNameAttribute {
    status: String
    response: PhoneNameAttributeResponse
  }

  type PhoneNameAttributeResponse {
    address: String
    businessNameDetected: Boolean
    ccrp: Boolean
    conditionsEvaluationStatus: Boolean
    digitalage: Int
    endTime: Float
    error: String
    firstNameMatch: Boolean
    lastNameMatch: Boolean
    nameMatchScore: Int
    ndrScore: Int
    phoneFootprintStrengthOverall: String
    phoneNameDigitalAge: Int
    revocationHistory: Boolean
    revocationMonth: String
    startTime: Float
    status: String
    unrScore: Int
  }

  type PhoneNetwork {
    status: String
    response: PhoneNetworkResponse
  }

  type PhoneNetworkResponse {
    conditionsEvaluationStatus: Boolean
    currentNetworkName: String
    currentNetworkRegion: String
    currentNetworkcountryCodeIso2: String
    endTime: Float
    error: String
    imsi: String
    isPhoneReachable: Boolean
    isValidPhoneNumber: Boolean
    numberBillingType: String
    numberHasPortingHistory: Boolean
    portedFromNetworkName: String
    portedFromNetworkRegion: String
    portedFromNetworkcountryCodeIso2: String
    roaming: Boolean
    roamingNetworkName: String
    roamingNetworkRegion: String
    roamingNetworkcountryCodeIso2: String
    startTime: Float
    status: String
  }

  type PhoneSocialCombinedReport {
    status: String
    response: PhoneSocialCombinedReportResponse
  }

  type PhoneSocialCombinedReportResponse {
    a23games: String
    ajio: String
    amazon: String
    awaitedOnThis: Boolean
    byjus: String
    conditionsEvaluationStatus: Boolean
    endTime: Float
    error: String
    flipkart: String
    housing: String
    indiamart: String
    instagram: String
    isWABusiness: String
    jeevansaathi: String
    jiomart: String
    microsoft: String
    mobile: String
    my11: String
    paytm: String
    referenceId: String
    rummycircle: String
    shaadi: String
    skype: String
    startTime: Float
    status: String
    swiggy: String
    toi: String
    whatsapp: String
    yatra: String
    zoho: String
  }

  type PhoneSocialCombinedSubmit {
    status: String
    response: PhoneSocialCombinedSubmitResponse
  }

  type PhoneSocialCombinedSubmitResponse {
    conditionsEvaluationStatus: Boolean
    endTime: Float
    error: String
    referenceId: String
    startTime: Float
    status: String
  }

  type RiskModel {
    status: String
    response: RiskModelResponse
  }

  type RiskModelResponse {
    address1: String
    address2: String
    addressCompletenessScore: Int
    addressInsights: String
    addressRisk: String
    alternateRiskScore: Int
    areaName: String
    areaPincode: String
    cityName: String
    commonEmailCount14Days: Int
    commonEmailCount28Days: Int
    commonEmailCount7Days: Int
    commonPhoneCount14Days: Int
    commonPhoneCount28Days: Int
    commonPhoneCount7Days: Int
    commonPhoneSequence5Digits14Days: Int
    commonPhoneSequence5Digits28Days: Int
    commonPhoneSequence5Digits7Days: Int
    commonPhoneSequence6Digits14Days: Int
    commonPhoneSequence6Digits28Days: Int
    commonPhoneSequence6Digits7Days: Int
    commonPhoneSequence7Digits14Days: Int
    commonPhoneSequence7Digits28Days: Int
    commonPhoneSequence7Digits7Days: Int
    conditionsEvaluationStatus: Boolean
    digitalBehaviour: DigitalBehaviour
    digitalFootprint: String
    emailDigitalAge: Int
    emailFraud: Boolean
    emailFraudCount: Int
    emailFraudNetwork: Boolean
    emailIdentityTrust: String
    emailL1Confidence: Int
    emailL1Count: Int
    emailL2Confidence: Int
    emailL2Count: Int
    emailSocialMediaCount: Int
    emailUNRScore: Int
    endTime: Float
    error: String
    identityConfidence: String
    isPhoneReachable: Boolean
    landmark: String
    message: String
    mobileFraud: Boolean
    mobileFraudCount: Int
    mobileFraudNetwork: Boolean
    mobileIdentityTrust: String
    mobileL1Confidence: Int
    mobileL1Count: Int
    mobileL2Confidence: Int
    mobileL2Count: Int
    negativeInsights: [String]
    phoneDigitalAge: Int
    phoneSocialMediaCount: Int
    phoneUNRScore: Int
    positiveInsights: [String]
    responseStatusCode: Int
    riskScores: RiskScores
    socialFootprintScore: Int
    societyName: String
    startTime: Float
    stateName: String
    status: String
    streetName: String
    telecomRisk: String
    unit: String
    upiPhoneNameMatch: Int
    upiPhoneNameMatchScore: Int
  }

  type DigitalBehaviour {
    affluenceScore: Float
    digitalPaymentScore: Float
    eCommerceScore: Float
    socialMediaScore: Float
    workUtilityScore: Float
  }

  type RiskScores {
    alternateRiskScore: Int
  }

  type Awaits {
    emailSocialCombinedReport: AwaitsResponse
    phoneSocialCombinedReport: AwaitsResponse
  }

  type AwaitsResponse {
    status: String
    response: AwaitsResponseEmailPhone
  }

  type AwaitsResponseEmailPhone {
    awaitedOnThis: Boolean
    data: [String]
  }

  type TransactionRawInput {
    countryCode: String
    email: String
    name: String
    phoneNumber: String
  }
`;

export const riskResolvers = {
  Query: {
    risk: async (_, { input }) => {
      const riskData = await riskAPI(input);
      // console.log(riskData.awaits);
      return {
        statusCode: riskData.statusCode,
        error: riskData.error,
        status: riskData.status,
        timestamp: riskData.timeStamp,
        transactionId: riskData.transactionId,
        merchantId: riskData.merchantId,
        workflowId: riskData.workflowId,
        workflowName: riskData.workflowName,
        outcome: riskData.outcome,
        transactionTimeline: riskData.transactionTimeline,
        services: {
          emailNameAttribute: riskData.services["Email Name Attribute"],
          emailSocialCombinedReport:
            riskData.services["Email Social Combined Report"],
          emailSocialCombinedSubmit:
            riskData.services["Email Social Combined Submit"],
          phoneName: riskData.services["Phone Name"],
          phoneNameAttribute: riskData.services["Phone Name Attribute"],
          phoneNetwork: riskData.services["Phone Network"],
          phoneSocialCombinedReport:
            riskData.services["Phone Social Combined Report"],
          phoneSocialCombinedSubmit:
            riskData.services["Phone Social Combined Submit"],
          riskModel: riskData.services["Risk Model"],
        },
        awaits: {
          emailSocialCombinedReport:
            riskData.awaits["Email Social Combined Report"],
          phoneSocialCombinedReport:
            riskData.awaits["Phone Social Combined Report"],
        },
        outcomeReasons: riskData.outcomeReasons,
        transactionRawInput: riskData.transactionRawInput,
        documents: riskData.documents,
        devices: riskData.devices,
      };
    },
  },
};
