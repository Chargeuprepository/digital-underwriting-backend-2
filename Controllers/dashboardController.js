import redisClient from "../redisClient.js";

export default async function dashboardController(cacheGoogleSheetKey) {
  //   const fetchDriversWithLimitedFields = async (fields) => {
  // Step 1: Get all driver IDs (assuming they are stored in a Redis set)
  const driverIds = await redisClient.get(
    "googleSheets_Data_AllDrivers_AllData"
  );
  console.log(driverIds);

  //     // Step 2: Fetch all driver JSON data using pipelining
  //     const pipeline = redisClient.pipeline();
  //     driverIds.forEach((id) => {
  //       pipeline.get(`driver:${id}`); // Fetch JSON data for each driver
  //     });

  //     const results = await pipeline.exec();

  //     // Step 3: Parse JSON and filter fields
  //     return driverIds.map((id, index) => {
  //       const driverData = JSON.parse(results[index][1]); // Parse JSON
  //       const filteredData = fields.reduce((acc, field) => {
  //         if (driverData[field] !== undefined) {
  //           acc[field] = driverData[field];
  //         }
  //         return acc;
  //       }, {});
  //       return { driverId: id, ...filteredData };
  //     });
  //   };
}
