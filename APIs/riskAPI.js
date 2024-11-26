import axios from "axios";
import https from "https";
import redisClient from "../redisClient.js";

export default async function riskAPI(input) {
  const url = "https://api.bureau.id/transactions";
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization:
        "Basic OWM4ZTFjNzYtNDViOS00ZDU2LWJkNDAtNzhmMmNlZGVhYmQ5OmEzMDE0MzNkLTYzODMtNDY5ZS1iN2I3LTUxNWM1MzcxNzgzNA==",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  let apiInput = {
    workflowId: "d7b8d856-5bee-41be-b234-3faf9b4cb9d9",
    data: {
      countryCode: "IND",
      // email: input.email,
      phoneNumber: input.phoneNumber,
      name: input.name,
      derivedSignals: true,
      enhancedCoverage: true,
    },
  };

  const response1 = await axios
    .post(url, apiInput, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
      return error;
    });

  apiInput = {
    transactionId: response1.data?.transactionId,
    ...apiInput,
  };

  const response2 = await axios
    .post(url, apiInput, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response2.data;
}
