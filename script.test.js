// Importing necessary modules
const readline = require("readline-sync");
const { calculateCost } = require("./first");

// Test case for calculateCost function
test("calculateCost function correctly calculates the total cost", () => {
  // Mocking user input for testing purposes
  readline.question = jest
    .fn()
    .mockReturnValueOnce("Customer Name") // Name
    .mockReturnValueOnce("10") // Distance
    .mockReturnValueOnce("20"); // Purchase Cost

  // Calling calculateCost function and storing the result
  const totalCost = calculateCost();

  // Assertion to check if the total cost matches the expected value
  expect(totalCost).toBeCloseTo(172.8, 1); // Expected total cost for the provided input
});

module.exports = {}; // Exporting an empty object to satisfy Jest requirements
