export function creditRiskKarmaZoneFilter(drivers, filters) {
  const { credit, risk, karma, zone, searchId } = filters;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  if (searchId) {
    return drivers.filter((driver) => driver.CreatedID === searchId);
  }

  return drivers
    .filter((driver) => {
      const onboardingMonth = new Date(driver.Onboarding_Date).getMonth(); // Extract the month from Onboarding_Date
      const onboardingYear = new Date(driver.Onboarding_Date).getFullYear(); // Extract the month from Onboarding_Date
      return onboardingMonth !== currentMonth || onboardingYear !== currentYear; // Filter out drivers whose onboarding month is the current month
    })
    .filter((driver) => driver.Status === "Active") // Always filter by status first
    .filter((driver) => {
      // Credit filter
      const creditFilter =
        !credit ||
        (credit === "high" && driver.creditScore > 650) ||
        (credit === "medium" &&
          driver.creditScore >= 450 &&
          driver.creditScore <= 650) ||
        (credit === "low" &&
          driver.creditScore <= 450 &&
          driver.creditScore > 0) ||
        (credit === "NTC" &&
          (driver.creditScore === -1 ||
            // driver.creditScore === "" ||
            driver.creditScore === null ||
            driver.creditScore === undefined));

      // Risk filter
      const riskFilter =
        !risk ||
        (risk === "high" && driver.riskScore > 650) ||
        (risk === "medium" &&
          driver.riskScore >= 450 &&
          driver.riskScore <= 650) ||
        (risk === "low" && driver.riskScore < 450);

      // Karma filter
      const karmaFilter =
        !karma ||
        (karma === "high" && driver.karmaScore > 700) ||
        (karma === "medium" &&
          driver.karmaScore >= 500 &&
          driver.karmaScore <= 700) ||
        (karma === "low" && driver.karmaScore < 500);

      // Zone filter
      const zoneFilter =
        !zone ||
        (Array.isArray(zone) &&
          zone.length > 0 &&
          zone.some((z) => driver.Es_City?.toLowerCase() === z.toLowerCase()));

      // All conditions must pass
      return creditFilter && riskFilter && karmaFilter && zoneFilter;
    });
}
