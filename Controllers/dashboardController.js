import redisClient from "../redisClient.js";
import googleSheetController from "./googleSheetController.js";

export default async function dashboardController(cacheGoogleSheetKey) {
  const cacheGoogleSheetData = await redisClient.get(cacheGoogleSheetKey);

  if (cacheGoogleSheetData) {
    console.log(`serving data from redis cache key: ${cacheGoogleSheetKey}`);
    return JSON.parse(cacheGoogleSheetData);
  }

  console.log("getting fresh data from the googleSheet");
  const data = await googleSheetController();
  await redisClient.setEx(cacheGoogleSheetKey, 300, JSON.stringify(data));

  return data;
}
