import { gql } from "apollo-server-express";
import riskAPI from "../APIs/riskAPI.js";

export const riskTypeDefs = gql`
  type Query {
    risk(input: RiskInput!): Transaction
  }
  input RiskInput {
    name: String!
    phoneNumber: String!
    email: String
    countryCode: String
    derivedSignals: String
    enhancedCoverage: String
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
    riskScore: Float
    header: Header
    insights: Insights
    allFourRisk: AllFourRisk
    telecomAttributes: TelecomAttributes
    digitalAttributes: DigitalAttributes
    socialAttributes: SocialAttributes
  }
  type Header {
    name: String
    mobile: String
  }
  type Insights {
    positives: [String]
    negatives: [String]
  }
  type AllFourRisk {
    identity: Identity
    telecom: Telecom
    digital: Digital
    social: Social
  }
  type Identity {
    identityConfidence: String
  }
  type Telecom {
    telecomRisk: String
    isPhoneReachable: String
    currentNetworkName: String
    phoneFootprintStrengthOverall: String
  }
  type Digital {
    digitalFootprint: String
    name: String
    nameMatchScore: Float
    phoneDigitalAge: Float
  }
  type Social {
    socialFootprintScore: Float
    phoneSocialMediaCount: Int
    socialMediaScore: Float
    eCommerceScore: Float
    workUtilityScore: Float
  }
  type TelecomAttributes {
    currentNetworkName: String
    currentNetworkRegion: String
    isPhoneReachable: String
    numberHasPortingHistory: String
    numberBillingType: String
    mobileFraud: String
    phoneFootprintStrengthOverall: String
  }
  type DigitalAttributes {
    name: String
    source: String
    vpa: String
    upiPhoneNameMatch: Float
    upiPhoneNameMatchScore: Float
    nameMatchScore: Float
    phoneDigitalAge: Float
  }
  type SocialAttributes {
    a23games: String
    ajio: String
    amazon: String
    byjus: String
    flipkart: String
    housing: String
    indiamart: String
    instagram: String
    isWABusiness: String
    jeevansaathi: String
    jiomart: String
    my11: String
    paytm: String
    rummycircle: String
    shaadi: String
    swiggy: String
    whatsapp: String
    yatra: String
  }
`;

export const riskResolvers = {
  Query: {
    risk: async (_, { input }) => {
      // console.log(input);
      const riskData = await riskAPI(input);
      // console.log(riskData);

      const headerData = riskData.transactionRawInput;
      const riskModelResponse = riskData.services["Risk Model"].response;
      const phoneNameAttribute =
        riskData.services["Phone Name Attribute"].response;
      const phoneName = riskData.services["Phone Name"].response;
      const phoneNetwork = riskData.services["Phone Network"].response;
      const socialMedia =
        riskData.services["Phone Social Combined Report"].response;

      return {
        statusCode: riskData.statusCode,
        error: riskData.error,
        status: riskData.status,
        timestamp: riskData.timestamp,
        transactionId: riskData.transactionId,
        merchantId: riskData.merchantId,
        workflowId: riskData.workflowId,
        workflowName: riskData.workflowName,
        riskScore: riskModelResponse.riskScores.alternateRiskScore,
        header: {
          name: headerData.name,
          mobile: headerData.phoneNumber,
        },
        insights: {
          positives: riskModelResponse.positiveInsights,
          negatives: riskModelResponse.negativeInsights,
        },
        allFourRisk: {
          identity: {
            identityConfidence: riskModelResponse.identityConfidence,
          },
          telecom: {
            telecomRisk: riskModelResponse.telecomRisk,
            isPhoneReachable: String(riskModelResponse.isPhoneReachable),
            currentNetworkName: phoneNetwork.currentNetworkName,
            phoneFootprintStrengthOverall:
              phoneNameAttribute.phoneFootprintStrengthOverall,
          },
          digital: {
            digitalFootprint: riskModelResponse.digitalFootprint,
            name: phoneName.name,
            nameMatchScore: phoneNameAttribute.nameMatchScore,
            phoneDigitalAge: riskModelResponse.phoneDigitalAge,
          },
          social: {
            socialFootprintScore: riskModelResponse.socialFootprintScore,
            phoneSocialMediaCount: riskModelResponse.phoneSocialMediaCount,
            socialMediaScore:
              riskModelResponse.digitalBehaviour.socialMediaScore,
            eCommerceScore: riskModelResponse.digitalBehaviour.eCommerceScore,
            workUtilityScore:
              riskModelResponse.digitalBehaviour.workUtilityScore,
          },
        },
        telecomAttributes: {
          currentNetworkName: phoneNetwork.currentNetworkName,
          currentNetworkRegion: phoneNetwork.currentNetworkRegion,
          isPhoneReachable: String(phoneNetwork.isPhoneReachable),
          numberHasPortingHistory: String(phoneNetwork.numberHasPortingHistory),
          numberBillingType: phoneNetwork.numberBillingType,
          mobileFraud: String(riskModelResponse.mobileFraud),
          phoneFootprintStrengthOverall:
            phoneNameAttribute.phoneFootprintStrengthOverall,
        },
        digitalAttributes: {
          name: phoneName.name,
          source: phoneName.source,
          vpa: phoneName.vpa,
          upiPhoneNameMatch: riskModelResponse.upiPhoneNameMatch,
          upiPhoneNameMatchScore: riskModelResponse.upiPhoneNameMatchScore,
          nameMatchScore: phoneNameAttribute.nameMatchScore,
          phoneDigitalAge: riskModelResponse.phoneDigitalAge,
        },
        socialAttributes: {
          a23games: socialMedia.a23games,
          ajio: null,
          amazon: socialMedia.amazon,
          byjus: socialMedia.byjus,
          flipkart: socialMedia.flipkart,
          housing: socialMedia.housing,
          indiamart: socialMedia.indiamart,
          instagram: socialMedia.instagram,
          isWABusiness: socialMedia.isWABusiness,
          jeevansaathi: socialMedia.jeevansaathi,
          jiomart: socialMedia.jiomart,
          my11: socialMedia.my11,
          paytm: socialMedia.paytm,
          rummycircle: socialMedia.rummycircle,
          shaadi: socialMedia.shaadi,
          swiggy: socialMedia.swiggy,
          whatsapp: socialMedia.whatsapp,
          yatra: socialMedia.yatra,
        },
      };
    },
  },
};
