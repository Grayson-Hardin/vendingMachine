const coinFunctions = require("../data/coins");

it("should get the verified coins", () => {
  const actual = coinFunctions.isCoinValid([
    coinFunctions.quarter,
    coinFunctions.nickle,
    coinFunctions.dime,
    coinFunctions.dollar,
    coinFunctions.washer,
  ]);

  expect(actual).toEqual([
    coinFunctions.quarter,
    coinFunctions.nickle,
    coinFunctions.dime,
    coinFunctions.dollar,
  ]);
});

it("should return true if the coin is verified", () => {
  const actual = coinFunctions.verifyCoin(coinFunctions.quarter);

  expect(actual).toEqual(true);
});

it("should return false if the coin is not verified", () => {
  const actual = coinFunctions.verifyCoin(coinFunctions.washer);

  expect(actual).toEqual(false);
});

it("should count the coins", () => {
  const actual = coinFunctions.countCoins([
    coinFunctions.quarter,
    coinFunctions.dollar,
  ]);

  expect(actual).toEqual(1.25);
});

it("should return 0 if no coins are given", () => {
  const actual = coinFunctions.countCoins([]);

  expect(actual).toEqual(0);
});

it("should return true if weight equals 5.67", () => {
  const actual = coinFunctions.verifyCoin(coinFunctions.quarter);

  expect(actual).toEqual(true);
});

it("should return true if weight equals 5.67 and diameter equals 24.26", () => {
  const actual = coinFunctions.verifyCoin({ weight: 5.67, diameter: 24.26 });

  expect(actual).toEqual(true);
});

it("should return true when given a valid coin weight and diameter", () => {
  const actual = coinFunctions.verifyCoin({ weight: 5.67, diameter: 24.26 });

  expect(actual).toEqual(true);
});

it("should return quarter and dollar when given the correct weight and diamater", () => {
  const payment = [
    { diameter: 24.26, weight: 5.67 },
    { diameter: 26.49, weight: 8.1 },
  ];
  const actual = coinFunctions.findCoinValue(payment);

  expect(actual).toEqual([coinFunctions.quarter, coinFunctions.dollar]);
});

it("should test coinManager", () => {
  const payment = [
    { diameter: 24.26, weight: 5.67 },
    { diameter: 26.49, weight: 8.1 },
  ];

  const actual = coinFunctions.coinManager(payment);
  expect(actual).toEqual(1.25);
});
