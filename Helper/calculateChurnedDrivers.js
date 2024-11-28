export function calculateChurnedDrivers(drivers) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-indexed, e.g., 0 for January
  const sixMonthsAgo = new Date(currentDate);
  sixMonthsAgo.setMonth(currentMonth - 6); // Subtract 6 months

  // Filter drivers churned in the last 6 months excluding the current month
  const churnedDrivers = drivers.filter((driver) => {
    if (!driver.churnedDate) return false;
    const churnedDate = new Date(driver.churnedDate);

    // Include entire months
    return (
      churnedDate.getFullYear() >= sixMonthsAgo.getFullYear() &&
      churnedDate.getMonth() >= sixMonthsAgo.getMonth() &&
      churnedDate.getFullYear() <= currentDate.getFullYear() &&
      churnedDate.getMonth() < currentMonth
    );
  });

  // Categorize by month
  const churnedByMonth = {};
  churnedDrivers.forEach((driver) => {
    const churnedDate = new Date(driver.churnedDate);
    const formattedMonth = churnedDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
      .replace(" ", "-"); // Replace space with a dash

    if (!churnedByMonth[formattedMonth]) {
      churnedByMonth[formattedMonth] = 0;
    }
    churnedByMonth[formattedMonth]++;
  });

  // Convert to array and sort by date
  const result = Object.entries(churnedByMonth)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(`${a.month}-01`) - new Date(`${b.month}-01`));

  return result;
}
