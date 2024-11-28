export function calculateSixMonthDrivers(drivers) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const currentMonth = today.getMonth(); // Current month (0-11)
  const currentYear = today.getFullYear();

  // Get the last day of the previous month (the day before the 1st of this month)
  const lastDayPreviousMonth = new Date(today);
  lastDayPreviousMonth.setMonth(currentMonth); // Set to current month
  lastDayPreviousMonth.setDate(0); // Set date to the last day of the previous month

  // Get the first date of the month 6 months ago (inclusive)
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(currentMonth - 6); // Set to 6 months ago
  sixMonthsAgo.setDate(1); // First day of the month 6 months ago

  // Helper function to parse date string to Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return null; // Return null if the date is invalid or undefined

    const formats = [
      { regex: /^(\d{2})-(\w{3})-(\d{2})$/, format: "dd-MMM-yy" },
      { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: "dd/MM/yyyy" },
      { regex: /^(\d{4})-(\d{2})-(\d{2})$/, format: "yyyy-MM-dd" },
      {
        regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
        format: "ISO 8601",
      },
    ];

    for (const { regex, format } of formats) {
      const match = dateStr.match(regex);
      if (match) {
        let day, month, year;

        if (format === "dd-MMM-yy") {
          [_, day, month, year] = match;
          year = `20${year}`; // Convert 2-digit year to 4-digit
          month = months.indexOf(month) + 1; // Convert month name to number
        } else if (format === "dd/MM/yyyy") {
          [_, day, month, year] = match;
        } else if (format === "yyyy-MM-dd") {
          [_, year, month, day] = match;
        } else if (format === "ISO 8601") {
          return new Date(dateStr); // ISO 8601 is already in Date format
        }

        return new Date(`${year}-${month}-${day}`); // Return as Date object
      }
    }

    return null; // If no format matched
  };

  // Filter and group data for the last 6 full months
  const recentDrivers = drivers.filter((driver) => {
    const onboardingDate = parseDate(driver.Onboarding_Date);
    return (
      onboardingDate &&
      onboardingDate >= sixMonthsAgo &&
      onboardingDate <= lastDayPreviousMonth
    ); // Include the last day of the previous month
  });

  const monthCounts = recentDrivers.reduce((acc, driver) => {
    const onboardingDate = parseDate(driver.Onboarding_Date);
    const monthYear = `${
      months[onboardingDate.getMonth()]
    }-${onboardingDate.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Convert counts to sorted array of results
  const sortedResults = Object.entries(monthCounts)
    .sort(([monthA], [monthB]) => {
      const [mA, yA] = monthA.split("-");
      const [mB, yB] = monthB.split("-");
      return (
        new Date(`${yA}-${months.indexOf(mA) + 1}-01`) -
        new Date(`${yB}-${months.indexOf(mB) + 1}-01`)
      );
    })
    .map(([month, count]) => ({ month, count }));

  return sortedResults;
}
