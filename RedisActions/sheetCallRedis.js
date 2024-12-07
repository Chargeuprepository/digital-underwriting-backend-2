import sheetCallController from "../Controllers/SheetCallController.js";
import redisClient from "../redisClient.js";

export default async function sheetCallRedis(cacheKey) {
  try {
    const cacheGoogleSheetKey = process.env.REDIS_ALL_DRIVERS;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`Serving from Redis cache key: ${cacheKey}`);
      const response = await JSON.parse(cachedData);

      return response;
    }

    // Fetch data from Google Sheets if not in cache
    const data = await sheetCallController(cacheGoogleSheetKey);

    // await redisClient.setEx(cacheKey, 300, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error in /api/data:", error);
  }
}
