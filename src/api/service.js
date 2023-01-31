export const purchaseItem = async (selection, coins) => {
    const body = { selection: selection, coins: coins };

    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`http://localhost:3001/vendingmachine`, options);
    const message = await response.json();

    return message;
};
