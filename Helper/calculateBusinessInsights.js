export function calculateBusinessInsights(drivers) {
  // Helper function to calculate percentages
  const calculatePercentages = (data) => {
    const total = drivers.length;
    for (const key in data) {
      data[key] = ((data[key] / total) * 100).toFixed();
    }
    return data;
  };

  const metrics = {
    vehicleFinanced: { yes: 0, no: 0 },
    identityConfidence: { high: 0, medium: 0, low: 0 },
    driversUsingUpi: { yes: 0, no: 0 },
    digitalFootprint: { high: 0, medium: 0, low: 0 },
    socialFootprint: { high: 0, medium: 0, low: 0 },
    socialMediaPlatform: {
      amazon: 0,
      whatsapp: 0,
      waBusiness: 0,
      instagram: 0,
      flipkart: 0,
      paytm: 0,
    },
    phoneFootprint: { high: 0, medium: 0, low: 0 },
    digitalAge: { high: 0, medium: 0, low: 0 },
    phoneNameMatchScore: { high: 0, medium: 0, low: 0 },
    phoneNetwork: { prepaid: 0, postpaid: 0 },
  };

  let totalCredit = 0;
  const range = { lowCount: 0, mediumCount: 0, highCount: 0 };
  const uniqueCities = new Set(); // To store unique cities

  for (const driver of drivers) {
    // VEHICLE_FINANCED
    metrics.vehicleFinanced[driver.vehicleFinance ? "yes" : "no"]++;

    // IDENTITY_CONFIDENCE
    metrics.identityConfidence[driver.identityConfidence.toLowerCase()]++;

    // PHONE_NAME_MATCH_SCORE
    const score = driver.phoneNameMatchScore;
    metrics.phoneNameMatchScore[
      score > 70 ? "high" : score >= 40 ? "medium" : "low"
    ]++;

    // DRIVERS_USING_UPI
    metrics.driversUsingUpi[driver.vpa ? "yes" : "no"]++;

    // DIGITAL_FOOTPRINT
    metrics.digitalFootprint[driver.digitalFootprint.toLowerCase()]++;

    // SOCIAL_FOOTPRINT
    const sfScore = driver.socialFootprintScore;
    metrics.socialFootprint[
      sfScore > 550 ? "high" : sfScore >= 300 ? "medium" : "low"
    ]++;

    // SOCIAL_MEDIA_PLATFORM
    [
      "amazon",
      "instagram",
      "whatsapp",
      "waBusiness",
      "flipkart",
      "paytm",
    ].forEach((platform) => {
      if (driver[platform] === "Account Found")
        metrics.socialMediaPlatform[platform]++;
    });

    // PHONE_FOOTPRINT
    metrics.phoneFootprint[driver.phoneFootprint.toLowerCase()]++;

    // DIGITAL_AGE
    const dAge = driver.digitalage;
    metrics.digitalAge[dAge > 550 ? "high" : dAge >= 400 ? "medium" : "low"]++;

    // PHONE_NETWORK
    metrics.phoneNetwork[driver.phoneNetwork]++;

    // CREDIT_SCORE_RANGE
    const creditScore = +driver.creditScore;
    if (creditScore > 0 && creditScore < 400) {
      range.lowCount++;
      totalCredit += creditScore;
    } else if (creditScore >= 400 && creditScore <= 650) {
      range.mediumCount++;
      totalCredit += creditScore;
    } else if (creditScore > 650) {
      range.highCount++;
      totalCredit += creditScore;
    }

    // COLLECT UNIQUE CITIES
    if (driver.Es_City) {
      uniqueCities.add(driver.Es_City);
    }
  }

  // PERCENTILE_CREDIT_AREA
  const creditDrivers = range.lowCount + range.mediumCount + range.highCount;
  const resultRange = {
    lowCreditPercentage: ((range.lowCount / creditDrivers) * 100).toFixed(),
    mediumCreditPercentage: (
      (range.mediumCount / creditDrivers) *
      100
    ).toFixed(),
    highCreditPercentage: ((range.highCount / creditDrivers) * 100).toFixed(),
  };
  const avgCredit = (totalCredit / creditDrivers).toFixed();

  // Convert all metrics to percentages
  for (const key in metrics) {
    metrics[key] = calculatePercentages(metrics[key]);
  }

  return {
    avgCredit,
    resultRange,
    uniqueCities: Array.from(uniqueCities), // Convert Set to Array
    ...metrics,
  };
}
