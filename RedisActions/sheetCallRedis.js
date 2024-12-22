import redisClient from "../redisClient.js";
import googleSheetController from "../Controllers/googleSheetController.js";
import redisClientSet from "../redisClientSet.js";
import redisClientGet from "../redisClientGet.js";

export default async function sheetCallRedis() {
  try {
    const cacheGoogleSheetKey = process.env.REDIS_ALL_DRIVERS;
    const cacheGoogleSheetData = await redisClientGet(cacheGoogleSheetKey);

    if (cacheGoogleSheetData.data !== null) {
      console.log(`serving data from redis cache key: ${cacheGoogleSheetKey}`);
      return {
        error: null,
        data: cacheGoogleSheetData.data,
      };
    }

    let settingGoogleSheetDataInfo = null;

    console.log("getting fresh data from the googleSheet");
    const response = await googleSheetController();

    if (response.error === null && response.data) {
      settingGoogleSheetDataInfo = await redisClientSet(
        cacheGoogleSheetKey,
        response.data
      );
    }

    if (cacheGoogleSheetData.error.status === 500) {
      return {
        settingGoogleSheetDataInfo,
        gettingGoogleSheetDataInfo: cacheGoogleSheetData.error,
        ...response,
      };
    }
    return { settingGoogleSheetDataInfo, ...response };
  } catch (error) {
    return {
      error: { status: 401, message: "Bad Request" },
      data: null,
    };
  }
}
