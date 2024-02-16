// Importing readline-sync module
const readline = require("readline-sync");

// Function to calculate the total cost
function calculateCost() {
  // Getting user input for name, distance, and purchase cost
  const name = readline.question("Enter customer's name: ");
  const distance = parseFloat(readline.question("Enter the distance in KM: "));
  const purchaseCost = parseFloat(
    readline.question("Enter the cost of record purchase: ")
  );

  // Calculation logic for delivery cost, purchase cost, and grand total
  const deliveryCost = distance * 15;
  const totalPurchaseCost = purchaseCost * 1.14;
  const grandTotal = deliveryCost + totalPurchaseCost;

  // Returning the grand total
  return grandTotal;
}

// Exporting the calculateCost function to be used in other modules
module.exports.calculateCost = calculateCost;
