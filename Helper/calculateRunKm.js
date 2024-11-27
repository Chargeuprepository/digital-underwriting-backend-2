export function calculateRunKm(drivers) {
  const totalDrivers = drivers.length;

  // Dynamically calculate the last three months
  const getLastThreeMonths = () => {
    const today = new Date();
    const months = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleString("default", { month: "long" }));
    }
    return months;
  };

  const monthNames = getLastThreeMonths();
  const months = ["lastRunKm", "secondLastRunKm", "thirdLastRunKm"];

  // Initialize counts for ranges for each month
  const counts = months.map(() => [0, 0, 0, 0, 0]);

  // Calculate counts
  drivers.forEach((driver) => {
    months.forEach((month, index) => {
      const runKm = parseFloat(driver[month]);

      if (runKm <= 20) {
        counts[index][0]++;
      } else if (runKm <= 40) {
        counts[index][1]++;
      } else if (runKm <= 60) {
        counts[index][2]++;
      } else if (runKm <= 80) {
        counts[index][3]++;
      } else {
        counts[index][4]++;
      }
    });
  });

  // Convert counts to percentages and return results with dynamic month names
  const results = months.map((_, index) => {
    const percentages = counts[index].map(
      (count) => `${((count / totalDrivers) * 100).toFixed(0)}%`
    );
    return {
      month: monthNames[index],
      percentages,
    };
  });

  return results;
}
