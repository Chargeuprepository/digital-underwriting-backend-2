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

  let data = {
    workflowId: input.workflowId,
    data: {
      countryCode: "IND",
      email: input.data.email,
      phoneNumber: input.data.phoneNumber,
      name: input.data.name,
      derivedSignals: true,
      enhancedCoverage: true,
    },
  };

  const response1 = await axios
    .post(url, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  data = { transactionId: response1.data.transactionId, ...data };

  const response2 = await axios
    .post(url, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response2.data;
}
