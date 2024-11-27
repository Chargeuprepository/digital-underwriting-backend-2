import dashboardController from "../Controllers/dashboardController.js";
import redisClient from "../redisClient.js";

export default async function dashboardRedis() {
  try {
    const cacheGoogleSheetKey = process.env.REDIS_ALL_DRIVERS;
    const cacheDashboardKey = process.env.REDIS_DASHBOARD;
    const cachedDashboardData = await redisClient.get(cacheDashboardKey);

    if (cachedDashboardData) {
      console.log("Serving from Redis cache key: dashboard_data");
      return cachedDashboardData;
    }

    // Fetch data from Google Sheets if not in cache
    const data = await dashboardController(cacheGoogleSheetKey);

    // await redisClient.setEx(cacheKey, 300, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error in /api/data:", error);
  }
}
