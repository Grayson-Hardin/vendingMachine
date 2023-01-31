const purchaseFunctions = require("../utlities/purchase");
const coinFunctions = require("../data/coins");
const vendingItemsFunctions = require("../data/vendingItems");

describe("integration tests", () => {
    it("should return error message if item is out of stock", () => {
        const item = "A2";

        const actual = purchaseFunctions.purchase([coinFunctions.dollar], item);

        expect(actual).toEqual({ message: "Item out of stock", status: "error" });
    });

    it("should return error", () => {
        const item = "A2";

        const actual = purchaseFunctions.purchase([coinFunctions.dollar], item);

        expect(actual).toEqual({ message: "Item out of stock", status: "error" });
    });

    it("should return message if insufficient funds", () => {
        const item = "A1";

        vendingItemsFunctions.getItemBySelection(item);
        const getItemProps = vendingItemsFunctions.items.find((item) => item.selection === "A1");

        const actual = purchaseFunctions.purchase([{ diameter: 17.91, weight: 2.268 }], item);

        expect(actual.message).toEqual(`Insufficient funds: item costs $${getItemProps.price}`);
    });

    it("should return message if insufficient funds", () => {
        const item = "A1";

        vendingItemsFunctions.getItemBySelection(item);
        const getItemProps = vendingItemsFunctions.items.find((item) => item.selection === "A1");

        const actual = purchaseFunctions.purchase([{ diameter: 17.91, weight: 2.268 }], item);

        expect(actual).toEqual({ message: "Insufficient funds: item costs $1", status: "error" });
    });

    it("should return a message with the change amount", () => {
        const item = "A1";
        const payment = [
            { diameter: 26.49, weight: 8.1 },
            { diameter: 26.49, weight: 8.1 },
        ];

        const getItemProps = vendingItemsFunctions.items.find((item) => item.selection === "A1");
        const change = purchaseFunctions.calculateChange(2, getItemProps);

        const actual = purchaseFunctions.purchase(payment, item);

        expect(actual.message).toEqual(`${getItemProps.name} Purchased. Change returned: $${change}`);
    });

    it("should return thank you message if purchase was sucessfull", () => {
        const item = "A1";
        vendingItemsFunctions.getItemBySelection("A1");
        const getItemProps = vendingItemsFunctions.items.find((item) => item.selection === "A1");

        const actual = purchaseFunctions.purchase([coinFunctions.dollar], item);

        expect(actual).toEqual({ message: `${getItemProps.name} Purchased`, status: "success" });
    });
});

describe("unit tests", () => {
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
        const payment = [coinFunctions.dollar.value + coinFunctions.dime.value + coinFunctions.dollar.value];
        const item = { price: 1.0 };
        const actual = purchaseFunctions.calculateChange(payment, item);

        //note: had to set it to string because VS code kept formatting it to 1.1, instead of 1.10
        expect(actual).toEqual("1.10");
    });
});
