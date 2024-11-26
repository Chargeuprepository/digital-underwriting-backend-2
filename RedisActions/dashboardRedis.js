import dashboardController from "../Controllers/dashboardController.js";
import redisClient from "../redisClient.js";

export default async function dashboardRedis() {
  try {
    const cacheGoogleSheetKey = "googleSheets_Data_AllDrivers_AllData";
    const cacheKey = "dashboard_data";
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Serving from Redis cache");
      return cachedData;
    }

    // Fetch data from Google Sheets if not in cache
    const data = await dashboardController(cacheGoogleSheetKey);

    // Cache the data in Redis for 5 minutes
    await redisClient.setEx(cacheKey, 300, JSON.stringify(data));
    return data;

    console.log("Serving fresh data from Google Sheets");
  } catch (error) {
    console.error("Error in /api/data:", error);
  }
}
