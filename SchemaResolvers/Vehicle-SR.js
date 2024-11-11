import { gql } from "graphql-tag";
import vehicleAPI from "../APIs/vehicleAPI.js";

export const vehicleTypeDefs = gql`
  type Vehicle {
    statusCode: Int
    headerData: HeaderData
    owner: Owner
    vehicleInformation: VehicleInformation
    registration: Registration
    insurance: Insurance
    additionalInformation: AdditionalInformation
  }

  type HeaderData {
    maker: String
    financer: String
    registrationNumber: String
  }

  type Owner {
    name: String
    serialNumber: Int
    fatherName: String
    permanentAddress: String
    presentAddress: String
    rcMobileNo: String
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
    registeredAt: String
    fitnessUpto: String
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
    vehicle(input: RegistrationNumber): Vehicle
  }
  input RegistrationNumber {
    rcNumber: String
  }
`;

export const vehicleResolvers = {
  Query: {
    vehicle: async (_, { input }) => {
      console.log(input);
      const vehicleData = await vehicleAPI(input);
      // console.log(vehicleData);
      return {
        statusCode: vehicleData.statusCode,
        headerData: {
          maker: vehicleData.makerDescription,
          financer: vehicleData.financier,
          registrationNumber: vehicleData.registrationNumber,
        },
        owner: {
          name: vehicleData.ownerName,
          serialNumber: vehicleData.ownerSerialNumber,
          fatherName: vehicleData.fatherName,
          permanentAddress: vehicleData.permanentAddress,
          presentAddress: vehicleData.presentAddress,
          rcMobileNo: vehicleData.rcMobileNo,
        },
        vehicleInformation: {
          chassisNumber: vehicleData.chassisNumber,
          makerDescription: vehicleData.makerDescription,
          manufacturedMonthYear: vehicleData.manufacturedMonthYear,
          makerModel: vehicleData.makerModel,
          engineNumber: vehicleData.engineNumber,
        },
        registration: {
          registrationNumber: vehicleData.registrationNumber,
          registrationDate: vehicleData.registrationDate,
          registeredAt: vehicleData.registeredAt,
          fitnessUpto: vehicleData.fitnessUpto,
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
