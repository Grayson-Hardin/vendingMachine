const coinFunctions = require("../data/coins");
const vendingItemsFunctions = require("../data/vendingItems");

async function purchase(payment = [], itemSelection) {

  const item = await vendingItemsFunctions.getItemBySelection(itemSelection);

  const returnCoins = coinFunctions.coinManager(payment);

  let roundTheCoins = returnCoins.toFixed(2);

  if (await vendingItemsFunctions.isItemInStock(item.selection_id) === false) {
    return { message: "Item out of stock", status: "error" };
  }

  if (insufficientPayment(roundTheCoins, item) === true) {
    return {
      message: `Insufficient funds: item costs $${item.price}`,
      status: "error",
    };
  }
  
  if (paymentOverflow(roundTheCoins, item) === true) {
    const change = calculateChange(roundTheCoins, item);
    return {
      message: `${item.name} Purchased. Change returned: $${change}`,
      status: "success",
    };
  }
  vendingItemsFunctions.updateInventory(item, itemSelection);

  return { message: `${item.name} Purchased`, status: "success" };
}

function insufficientPayment(payment, item) {
  return payment < item.price;
}

function paymentOverflow(payment, item) {
  return payment > item.price;
}

function calculateChange(payment, item) {
  let change = payment - item.price;
  return change.toFixed(2);
}

module.exports = {
  purchase,
  insufficientPayment,
  paymentOverflow,
  calculateChange,
};
