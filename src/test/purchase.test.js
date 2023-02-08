const purchaseFunctions = require("../utlities/purchase");
const coinFunctions = require("../data/coins");
const vendingItemsFunctions = require("../data/vendingItems");


beforeEach(async () => {
  const spyGetItemBySelection = jest.spyOn(vendingItemsFunctions, "getItemBySelection")
  spyGetItemBySelection.mockResolvedValue({ name: 'Mountain Dew', price: 1, inventory: 5, selection_id: 'A1' })

  const spyIsItemInStock = jest.spyOn(vendingItemsFunctions, "isItemInStock")
  spyIsItemInStock.mockResolvedValue(true)

})
describe("integration endTests", () => {
  it("should return error message if item is out of stock", async () => {
    const item = "A2";

    const spyIsItemInStock = jest.spyOn(vendingItemsFunctions, "isItemInStock")
    spyIsItemInStock.mockResolvedValue(false)

    const actual = await purchaseFunctions.purchase([], item);

    expect(actual).toEqual({ message: "Item out of stock", status: "error" });
  });

  // it("should return error", async () => {
  //   const item = "B2";

  //   const actual = await purchaseFunctions.purchase([coinFunctions.dollar], item);

  //   expect(actual).toEqual({ message: "Item out of stock", status: "error" });
  // });

  // it("should return message if insufficient funds", () => {
  //   const item = "A1";

  //   vendingItemsFunctions.getItemBySelection(item);
  //   const getItemProps = vendingItemsFunctions.items.find(
  //     (item) => item.selection === "A1"
  //   );

  //   const actual = purchaseFunctions.purchase(
  //     [{ diameter: 17.91, weight: 2.268 }],
  //     item
  //   );

  //   expect(actual.message).toEqual(
  //     `Insufficient funds: item costs $${getItemProps.price}`
  //   );
  // });

  // only mock code that is not in purchase.js
  // mock coinfunctions / vendingItems
  // practice on mocking

  it("should return message if insufficient funds", async () => {
    const item = "A1";

    const actual = await purchaseFunctions.purchase([], item);

    expect(actual).toEqual({ message: "Insufficient funds: item costs $1", status: "error", });
  });

  it("should return a message with the change amount", async () => {
    const spyCoinManager = jest.spyOn(coinFunctions, "coinManager")
    spyCoinManager.mockReturnValue(1.10)

    const item = "A1";

    const actual = await purchaseFunctions.purchase([], item);

    expect(actual.message).toEqual(`Mountain Dew Purchased. Change returned: $0.10`)

  });

  it("should return thank you message if purchase was sucessfull", async () => {
    const spyCoinManager = jest.spyOn(coinFunctions, "coinManager")
    spyCoinManager.mockReturnValue(1.00)

    const item = "A1";

    const actual = await purchaseFunctions.purchase([], item);

    expect(actual).toEqual({ message: `Mountain Dew Purchased`, status: "success" });
  });

});

describe("unit endTests", () => {
  it("should return true if payment is insufficient", () => {
    const payment = [0.25];
    const item = { price: 1.0 };

    const actual = purchaseFunctions.insufficientPayment(payment, item);

    expect(actual).toEqual(true);
  });

  it("should return false if payment is sufficient", () => {
    const payment = [1.0];

    const item = { price: 1.0 };

    const actual = purchaseFunctions.insufficientPayment(payment, item);

    expect(actual).toEqual(false);
  });

  it("should return true if payment is too much", () => {
    const payment = [2.0];
    const item = { price: 1.0 };

    const actual = purchaseFunctions.paymentOverflow(payment, item);

    expect(actual).toEqual(true);
  });

  it("should return false if the payment is not more than the item price", () => {
    const payment = [1.0];
    const item = { price: 1.0 };

    const actual = purchaseFunctions.paymentOverflow(payment, item);

    expect(actual).toEqual(false);
  });

  it("should calculate the change", () => {
    const payment = [
      coinFunctions.dollar.value +
      coinFunctions.dime.value +
      coinFunctions.dollar.value,
    ];
    const item = { price: 1.0 };
    const actual = purchaseFunctions.calculateChange(payment, item);

    //note: had to set it to string because VS code kept formatting it to 1.1, instead of 1.10
    expect(actual).toEqual("1.10");
  });
});
