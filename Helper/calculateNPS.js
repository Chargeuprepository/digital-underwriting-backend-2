export default function calculateNPS(drivers) {
  const ratings = [5, 4, 3, 2, 1];

  const NPSRatings = ratings.map((rating) => {
    return drivers.filter((driver) => Math.round(driver.NPS) === rating).length;
  });

  return NPSRatings;
}

// export function calculateChurnedDrivers(drivers) {
//   const currentDate = new Date(); // Simulate current date: 25th March 2025
//   const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
//   const currentYear = currentDate.getFullYear();

//   // Calculate the first day of 6 months ago
//   const sixMonthsAgo = new Date(currentYear, currentMonth - 6, 1);

//   // Initialize an array to hold the last 6 months
//   const months = [];
//   for (let i = 5; i >= 0; i--) {
//     const date = new Date(currentYear, currentMonth - i - 1, 1); // Exclude the current month
//     const formattedMonth = date
//       .toLocaleDateString("en-US", { year: "numeric", month: "short" })
//       .replace(" ", "-");
//     months.push({ month: formattedMonth, count: 0 });
//   }

//   // Filter drivers churned in the last 6 months excluding the current month
//   const churnedDrivers = drivers.filter((driver) => {
//     if (!driver.churnedDate) return false;
//     const churnedDate = new Date(driver.churnedDate);

//     return (
//       churnedDate >= sixMonthsAgo &&
//       churnedDate < new Date(currentYear, currentMonth, 1) // Exclude the current month
//     );
//   });

//   // Categorize by month
//   churnedDrivers.forEach((driver) => {
//     const churnedDate = new Date(driver.churnedDate);
//     const formattedMonth = churnedDate
//       .toLocaleDateString("en-US", { year: "numeric", month: "short" })
//       .replace(" ", "-");

//     const monthEntry = months.find((entry) => entry.month === formattedMonth);
//     if (monthEntry) {
//       monthEntry.count++;
//     }
//   });

//   return months;
// }
