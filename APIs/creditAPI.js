import axios from "axios";
import https from "https";

export default async function creditAPI(creditParams) {
  const url =
    "https://api.sandbox.bureau.id/v2/services/credit-report-generation";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization:
        "Basic NzZmYjczMzctOWJiYy00YTA4LWE2ZGEtNTQxZGNiYzBhY2UwOjk3OGJhYWE3LWY3YzctNGQ0Yy05ZTcyLTJlODI1NmJmZGQ1Yw==",
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  try {
    const response = await axios.post(url, creditParams, options);
    // return JSON.stringify(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).json({ error: "Failed to fetch data" });
  }
}
