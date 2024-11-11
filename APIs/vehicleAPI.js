import axios from "axios";
import https from "https";

export default async function vehicleAPI(registrationNumber) {
  const url = "https://api.sandbox.bureau.id/v2/services/rc-authentication";
  const options = {
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
    const response = await axios.post(
      url,
      { docNumber: registrationNumber.rcNumber },
      options
    );
    return response.data;
    // res.json({ data: response.data });
  } catch (error) {
    // console.error("Error fetching data:", error);
    return error;
  }
}
