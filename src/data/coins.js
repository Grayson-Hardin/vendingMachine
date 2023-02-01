let nickle = { diameter: 21.21, weight: 5.0, value: 0.05 };
let dime = { diameter: 17.91, weight: 2.268, value: 0.1 };
let quarter = { diameter: 24.26, weight: 5.67, value: 0.25 };
let dollar = { diameter: 26.49, weight: 8.1, value: 1.0 };
let washer = { diameter: 2, weight: 2, value: 0 };
const legitCoins = [quarter, nickle, dime, dollar];

function coinManager(coins = []) {
  const validCoins = isCoinValid(coins);
  const coinValues = findCoinValue(validCoins);
  const totalPayment = countCoins(coinValues);

  return totalPayment;
}

function verifyCoin(coin) {
  const match = legitCoins.some(
    (validCoin) =>
      validCoin.weight === coin.weight && validCoin.diameter === coin.diameter
  );
  return match;
}

function isCoinValid(coins = []) {
  const validCoins = [];

  for (let coin of coins) {
    if (verifyCoin(coin) === true) {
      validCoins.push(coin);
    }
  }
  return validCoins;
}

function findCoinValue(payment = []) {
  const listOfCoins = [];

  for (let coin of payment) {
    const actual = legitCoins.find(
      (coinType) =>
        coinType.weight === coin.weight && coinType.diameter === coin.diameter
    );
    listOfCoins.push(actual);
  }
  return listOfCoins;
}

function countCoins(coins = []) {
  let totalPayment = 0;
  for (let coin of coins) {
    totalPayment += coin.value;
  }
  return totalPayment;
}

module.exports = {
  countCoins,
  coinManager,
  verifyCoin,
  isCoinValid,
  findCoinValue,
  nickle,
  dime,
  quarter,
  dollar,
  washer,
};
