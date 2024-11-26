import fetchGoogleSheet from "./fetchGoogleSheet.js";
import { redisClient } from "./redisClient.js";

const CACHE_KEY = "google_sheet_data";

export const resolvers = {
  Query: {
    getSheetData: async () => {
      // Check Redis cache
      const cachedData = await redisClient.get(CACHE_KEY);
      if (cachedData) {
        console.log("Serving data from Redis");
        return JSON.parse(cachedData);
      }

      // Fetch data from Google Sheets
      console.log("Fetching data from Google Sheets...");
      const data = await fetchGoogleSheet();

      // Cache data in Redis
      await redisClient.set(CACHE_KEY, JSON.stringify(data), "EX", 86400); // Cache for 24 hours

      return data;
    },
  },
};
