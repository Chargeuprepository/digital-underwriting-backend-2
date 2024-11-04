import { gql } from "graphql-tag";
import RCDetails from "../APIs/vehicleAPI.js";

export const vehicleTypeDefs = gql`
  type Vehicle {
    owner: Owner
    vehicleInformation: VehicleInformation
    registration: Registration
    insurance: Insurance
    additionalInformation: AdditionalInformation
  }

  type Owner {
    name: String
    serialNumber: Int
    fatherName: String
    permanentAddress: String
    presentAddress: String
    mobileNumber: String
  }

  type VehicleInformation {
    chassisNumber: String
    makerDescription: String
    manufacturedMonthYear: String
    makerModel: String
    engineNumber: String
    financierDetails: String
  }

  type Registration {
    registrationNumber: String
    registrationDate: String
    registeredAtRTO: String
    fitnessUpto: String
    status: String
  }

  type Insurance {
    insuranceCompany: String
    insurancePolicyNumber: String
    insuranceValidity: String
  }

  type AdditionalInformation {
    bodyTypeDescription: String
    color: String
    fuelType: String
    cubicCapacity: String
    grossVehicleWeight: String
    numberOfCylinders: String
    unladenWeight: String
    seatingCapacity: String
    vehicleCategory: String
    vehicleClassDescription: String
    normsDescription: String
  }

  type Query {
    vehicle(registrationNumber: String!): Vehicle
  }
`;

export const vehicleResolvers = {
  Query: {
    vehicle: async (_, { registrationNumber }) => {
      const vehicleData = await RCDetails(registrationNumber);
      return {
        owner: {
          name: vehicleData.ownerName,
          serialNumber: vehicleData.ownerSerialNumber,
          fatherName: vehicleData.fatherName,
          permanentAddress: vehicleData.permanentAddress,
          presentAddress: vehicleData.presentAddress,
          mobileNumber: vehicleData.mobileNumber,
        },
        vehicleInformation: {
          chassisNumber: vehicleData.chassisNumber,
          makerDescription: vehicleData.makerDescription,
          manufacturedMonthYear: vehicleData.manufacturedMonthYear,
          makerModel: vehicleData.makerModel,
          engineNumber: vehicleData.engineNumber,
          financierDetails: vehicleData.financierDetails,
        },
        registration: {
          registrationNumber: vehicleData.registrationNumber,
          registrationDate: vehicleData.registrationDate,
          registeredAtRTO: vehicleData.registeredAtRTO,
          fitnessUpto: vehicleData.fitnessUpto,
          status: vehicleData.status,
        },
        insurance: {
          insuranceCompany: vehicleData.insuranceCompany,
          insurancePolicyNumber: vehicleData.insurancePolicyNumber,
          insuranceValidity: vehicleData.insuranceValidity,
        },
        additionalInformation: {
          bodyTypeDescription: vehicleData.bodyTypeDescription,
          color: vehicleData.color,
          fuelType: vehicleData.fuelType,
          cubicCapacity: vehicleData.cubicCapacity,
          grossVehicleWeight: vehicleData.grossVehicleWeight,
          numberOfCylinders: vehicleData.numberOfCylinders,
          unladenWeight: vehicleData.unladenWeight,
          seatingCapacity: vehicleData.seatingCapacity,
          vehicleCategory: vehicleData.vehicleCategory,
          vehicleClassDescription: vehicleData.vehicleClassDescription,
          normsDescription: vehicleData.normsDescription,
        },
      };
    },
  },
};
