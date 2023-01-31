let items = [
    { name: "Mountain Dew", price: 1.0, inventory: 5, selection: "A1" },
    { name: "Root Beer", price: 0.75, inventory: 0, selection: "A2" },
    { name: "Dr Pepper", price: 0.5, inventory: 10, selection: "A3" },
    { name: "Coke", price: 1.0, inventory: 15, selection: "B1" },
    { name: "Pepsi", price: 1.0, inventory: 12, selection: "B2" },
    { name: "Sprite", price: 1.0, inventory: 6, selection: "B3" },
    { name: "Diet Coke", price: 1.0, inventory: 18, selection: "C1" },
    { name: "Diet Mountain Dew", price: 1.0, inventory: 20, selection: "C2" },
    { name: "Diet Pepsi", price: 1.0, inventory: 13, selection: "C4" },
];

function getItemBySelection(selection) {
    return items.find((item) => item.selection === selection);
}

function isItemInStock(selection) {
    return selection.inventory > 0;
}

function updateInventory(selection) {
    for (let item of items) {
        if (item.selection === selection) {
            item.inventory--;
        }
    }
}

module.exports = { getItemBySelection, isItemInStock, updateInventory, items };
