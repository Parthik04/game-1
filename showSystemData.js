const os = require("os");

// Function to convert bytes to gigabytes
const bytesToGb = (bytes) => (bytes / 1024 / 1024 / 1024).toFixed(2);

// Function to get platform information
const getPlatform = () => os.platform();

// Function to get release information
const getRelease = () => os.release();

// Function to get number of CPU cores
const getCores = () => os.cpus().length;

// Function to get total RAM memory
const getTotalMemory = () => bytesToGb(os.totalmem());

// Function to get free RAM memory
const getFreeMemory = () => bytesToGb(os.freemem());

module.exports = {
  getPlatform,
  getRelease,
  getCores,
  getTotalMemory,
  getFreeMemory,
};
