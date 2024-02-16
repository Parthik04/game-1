const {
  getPlatform,
  getRelease,
  getCores,
  getTotalMemory,
  getFreeMemory,
} = require("./showSystemData");

test("getPlatform returns the correct platform information", () => {
  expect(getPlatform()).toBeDefined();
});

test("getRelease returns the correct release information", () => {
  expect(getRelease()).toBeDefined();
});

test("getCores returns the correct number of CPU cores", () => {
  expect(getCores()).toBeGreaterThan(0);
});

test("getTotalMemory returns a valid total memory value", () => {
  expect(Number(getTotalMemory())).toBeGreaterThan(0);
});

test("getFreeMemory returns a valid free memory value", () => {
  expect(Number(getFreeMemory())).toBeGreaterThan(0);
});
