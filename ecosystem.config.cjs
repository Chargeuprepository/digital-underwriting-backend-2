module.exports = {
  apps: [
    {
      name: "Digital_Underwriting_Backend",
      script: "./server.js", // Path to your main server file
      instances: 1, // Number of instances (1 for single-threaded)
      exec_mode: "cluster", // Use "fork" for a single instance or "cluster" for multi-instance
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
