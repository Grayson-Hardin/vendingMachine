const { Client } = require("pg");
const vendingItemsFunctions = require("../data/vendingItems");

let client;
beforeAll(async () => {
  client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
  });

  await client.connect();

  await client.query(`DROP TABLE if exists items; 
  CREATE TABLE items (name varchar(32), price integer, inventory integer, selection_id varchar(2));

  insert into items values('Mountain Dew', 1, 5, 'A1');
  insert into items values('Root Beer', .75, 1, 'A2');
  insert into items values('Dr Pepper', .5, 10, 'A3');
  insert into items values('Coke', 1, 15, 'B1');
  insert into items values('Pepsi', 1, 12, 'B2');
  insert into items values('Sprite', 1, 6, 'B3');
  insert into items values('Diet Coke', 1, 18, 'C1');
  insert into items values('Diet Mountain Dew', 1, 20, 'C2');
  insert into items values('Diet Pepsi', 1, 13, 'C3');`);
});
afterAll(async () => {
  await client.end();
});

it("should return Dr Pepper if A1 is selected", async () => {
  const actual = await vendingItemsFunctions.getItemBySelection("A3");

  expect(actual.name).toEqual("Dr Pepper");
});

it("should return true if item is in stock", async () => {
  await client.query(
    "UPDATE items SET inventory = 5 WHERE selection_id = 'A1'"
  );

  const actual = await vendingItemsFunctions.isItemInStock("A1");

  expect(actual).toEqual(true);
});

it("should return false if item is not in stock", async () => {
  await client.query(
    "UPDATE items SET inventory = 0 WHERE selection_id = 'B1'"
  );

  const actual = await vendingItemsFunctions.isItemInStock("B1");

  expect(actual).toEqual(false);
});

it("should update the inventory", async () => {
  await client.query(
    "UPDATE items SET inventory = 5 WHERE selection_id = 'A1'"
  );

  await vendingItemsFunctions.updateInventory("A1");

  const newValue = await client.query(
    "SELECT inventory from items WHERE selection_id = 'A1'"
  );

  expect(newValue.rows[0].inventory).toEqual(4);
});
