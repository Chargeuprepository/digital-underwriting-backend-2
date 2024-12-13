export function calculateWhereIStand(drivers) {
  const ranges = [
    { range: "0-400", min: 0, max: 400, color: "#00953c" },
    { range: "401-500", min: 401, max: 500, color: "#1aa050" },
    { range: "501-600", min: 501, max: 600, color: "#f9f906" },
    { range: "601-750", min: 601, max: 750, color: "#ff9c38" },
    { range: "751-999", min: 751, max: 999, color: "#f01010" },
  ];

  const result = ranges.map(({ range, min, max, color }) => {
    const count = drivers.filter(
      (driver) => driver.riskScore >= min && driver.riskScore <= max
    ).length;
    return {
      score: range,
      percent: ((count / drivers.length) * 100).toFixed(2) + "%",
      color,
    };
  });

  return result;
}
