import redisClient from "../redisClient.js";
import googleSheetController from "../Controllers/googleSheetController.js";

export default async function sheetCallRedis() {
  try {
    const cacheGoogleSheetKey = process.env.REDIS_ALL_DRIVERS;
    const cacheGoogleSheetData = await redisClient.get(cacheGoogleSheetKey);

    if (cacheGoogleSheetData) {
      console.log(`serving data from redis cache key: ${cacheGoogleSheetKey}`);
      const data = JSON.parse(cacheGoogleSheetData);
      return { error: null, data: data };
    }

    console.log("getting fresh data from the googleSheet");
    const data = await googleSheetController();
    if (data.error === null && data.data) {
      await redisClient.setEx(
        cacheGoogleSheetKey,
        3600 * 24,
        JSON.stringify(data.data)
      );
    }

    return data;
  } catch (error) {
    return {
      error: { status: 401, message: "Bad Request" },
      data: null,
    };
  }
}
