import axios from "axios";
import { error } from "console";
import https from "https";

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
      phoneNumber: "91" + input.phoneNumber,
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
      return error;
    });

  if (response1.status !== 200) {
    return response1;
  }

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
      return error;
    });
  return response2.data;
}
