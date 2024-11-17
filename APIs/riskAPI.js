import axios from "axios";
import https from "https";

export default async function riskAPI(input) {
  const url = "https://api.sandbox.bureau.id/transactions";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic NzZmYjczMzctOWJiYy00YTA4LWE2ZGEtNTQxZGNiYzBhY2UwOjk3OGJhYWE3LWY3YzctNGQ0Yy05ZTcyLTJlODI1NmJmZGQ1Yw==",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  let apiInput = {
    workflowId: "f3009b74-f67c-479c-b493-122be98ca20b",
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
