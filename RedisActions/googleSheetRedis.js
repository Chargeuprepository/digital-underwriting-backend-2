import googleSheetController from "../Controllers/googleSheetController.js";
import redisClient from "../redisClient.js";

// Endpoint to fetch data
export default async function googleSheetRedis() {
  try {
    const cacheKey = process.env.REDIS_ALL_DRIVERS;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("Serving from Redis cache");
      return cachedData;
    }

    // Fetch data from Google Sheets if not in cache
    console.log("Serving fresh data from Google Sheets");
    const data = await googleSheetController();

    // Cache the data in Redis for 60 minutes
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
  } catch (error) {
    console.error("Error", error);
  }
}
