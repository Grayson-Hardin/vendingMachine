const vendingItemsFunctions = require("../data/vendingItems");

it("should return Dr Pepper if A1 is selected", () => {
    vendingItemsFunctions.getItemBySelection("A3");

    const actual = vendingItemsFunctions.items.find((item) => item.selection === "A3");

    expect(actual.name).toEqual("Dr Pepper");
});

it("should verify item is in stock", () => {
    vendingItemsFunctions.isItemInStock("A2");

    const actual = vendingItemsFunctions.items.find((item) => item.selection === "A2");

    expect(actual.inventory).toEqual(0);
});

it("should update the inventory", () => {
    vendingItemsFunctions.updateInventory("A1");

    const actual = vendingItemsFunctions.items.find((item) => item.selection === "A1");

    expect(actual.inventory).toEqual(4);
});
