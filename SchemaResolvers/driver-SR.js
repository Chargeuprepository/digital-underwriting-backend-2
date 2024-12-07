import { gql } from "apollo-server-express";
import sheetCallRedis from "../RedisActions/sheetCallRedis.js";
import { calculateVehicleAge } from "../Helper/calculateVehicleAge.js";

export const driverTypeDefs = gql`
  type Query {
    driver(input: String!): DriverData
  }

  type DriverData {
    id: String
    status: String
    onboardedDate: String
    cardData: CardData
    personalInformation: PersonalInformation
    contactInformation: ContactInformation
    vehicleInformation: VehicleInformation
    financialInformation: FinancialInformation
    riskAndCreditInformation: RiskAndCreditInformation
    businessInformation: BusinessInformation
    socialMediaInformation: SocialMediaInformation
    runKmInformation: RunKmInformation
    earningInformation: EarningInformation
    emi: String
  }

  type CardData {
    service: String
    runKm: String
    lossDays: String
    karmaScore: String
    nps: String
    avgDpd: String
    aon: String
  }

  type PersonalInformation {
    firstName: String
    lastName: String
    dob: String
    gender: String
    maritalStatus: String
    noOfChildren: String
    permanentAddress: String
    city: String
    state: String
  }

  type ContactInformation {
    mobile: String
    aadhaar: String
    pan: String
    vpa: String
    source: String
  }

  type VehicleInformation {
    vehicleFinanced: String
    vehicleType: String
    vehicleRegistrationNumber: String
    vehicleModel: String
    serviceType: String
    registrationDate: String
    vehicleAgeInMonths: String
  }

  type FinancialInformation {
    bankAccountNumber: String
    IFSCCode: String
    downPayment: String
    tenure: String
    creditScore: String
    avgDpd: String
    emiDpd: String
  }

  type RiskAndCreditInformation {
    riskScore: String
    socialFootPrintScore: String
    telecomRisk: String
    socialScore: String
    digitalFootPrint: String
    identityConfidence: String
  }

  type BusinessInformation {
    businessSegment: String
    serviceType: String
  }

  type SocialMediaInformation {
    amazon: String
    flipkart: String
    instagram: String
    waBusiness: String
    paytm: String
    whatsapp: String
  }

  type RunKmInformation {
    thirdLastRunKm: String
    secondLastRunKm: String
    lastRunKm: String
  }
  type EarningInformation {
    thirdLastEarning: String
    secondLastEarning: String
    lastEarning: String
  }
`;

export const driverResolvers = {
  Query: {
    driver: async (_, { input }) => {
      const drivers = await sheetCallRedis(process.env.REDIS_DRIVER);

      const driverData = drivers.find((driver) => driver.CreatedID === input);

      function ageOnNetwork(date) {
        const startDate = new Date(date);
        const currentDate = new Date();

        const timeDiff = currentDate - startDate; // Difference in milliseconds
        const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

        return dayDiff;
      }

      const driverManipulatedData = {
        id: driverData.CreatedID,
        status: driverData.Status,
        onboardedDate: driverData.Onboarding_Date.split("T")[0],
        cardData: {
          service: driverData.service,
          runKm: driverData.runKm.toFixed(),
          lossDays: driverData.lossDays,
          karmaScore: driverData.karmaScore,
          nps: driverData.NPS.toFixed(),
          avgDpd: driverData.avgDPD.toFixed(),
          aon: ageOnNetwork(driverData.Onboarding_Date),
        },
        personalInformation: {
          firstName: driverData.OwnerFirstName,
          lastName: driverData.LastName,
          dob: driverData.Owners_DOB.split("T")[0],
          gender: driverData.Owner_Gender,
          maritalStatus: driverData.MaritalStatus,
          noOfChildren: driverData.NoofChildren,
          permanentAddress: driverData.Owner_Permanent_Address,
          city: driverData.Es_City,
          state: driverData.State,
        },
        contactInformation: {
          mobile: driverData.Contact_Number_of_Owner,
          aadhaar: driverData.Owner_Aadhaar_Number,
          pan: driverData.Owner_PAN_Number,
          vpa: driverData.vpa,
          source: driverData.source,
        },
        vehicleInformation: {
          vehicleFinanced: driverData.vehicleFinance,
          vehicleType: driverData.VehicleType,
          vehicleRegistrationNumber: driverData.VehicleRegistrationNumber,
          vehicleModel: driverData.VehicleModel,
          serviceType: driverData.ServiceType,
          registrationDate: driverData.PurchaseDate, // If you have purchase date
          vehicleAgeInMonths: calculateVehicleAge(driverData.PurchaseDate), // Assuming you have a helper function for this
        },
        financialInformation: {
          bankAccountNumber: driverData.Bank_Account_Number,
          IFSCCode: driverData.IFSC_Code,
          downPayment: driverData.DownPayment,
          tenure: driverData.Tenure,
          creditScore: driverData.creditScore,
          avgDpd: driverData.avgDPD.toFixed(2),
          emiDpd: driverData.emidpd,
        },
        riskAndCreditInformation: {
          riskScore: driverData.riskScore,
          socialFootPrintScore: driverData.socialFootprintScore,
          telecomRisk: driverData.telecomRisk,
          socialScore: driverData.socialScore,
          digitalFootPrint: driverData.digitalFootprint,
          identityConfidence: driverData.identityConfidence,
        },
        businessInformation: {
          businessSegment: driverData.BusinessSegment,
          serviceType: driverData.ServiceType,
        },
        socialMediaInformation: {
          amazon: driverData.amazon,
          flipkart: driverData.flipkart,
          instagram: driverData.instagram,
          waBusiness: driverData.waBusiness,
          paytm: driverData.paytm,
          whatsapp: driverData.whatsapp,
        },
        runKmInformation: {
          thirdLastRunKm: driverData.thirdLastRunKm.toFixed(),
          secondLastRunKm: driverData.secondLastRunKm.toFixed(),
          lastRunKm: driverData.lastRunKm.toFixed(),
        },
        earningInformation: {
          thirdLastEarning: (driverData.thirdLastRunKm * 15 * 25).toFixed(),
          secondLastEarning: (driverData.secondLastRunKm * 15 * 25).toFixed(),
          lastEarning: (driverData.lastRunKm * 15 * 25).toFixed(),
        },
        emi: driverData.emidpd,
      };

      return driverManipulatedData;
    },
  },
};
