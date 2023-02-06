const { Client } = require("pg");
let client;

async function setUpConnection(){
    client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
  })

  await client.connect();
}

async function closeConnection(){
  await client.end();

}

async function getItemBySelection(selection) {
  setUpConnection()

  const res = await client.query("SELECT * from items WHERE selection_id = $1", [selection]);

  closeConnection()

  return res.rows[0];
}

async function isItemInStock(selection) {
  setUpConnection()

  const res = await client.query("SELECT inventory from items WHERE selection_id = $1", [selection]);

  closeConnection()

  return res.rows[0].inventory > 0
}


async function updateInventory(selection) {
  setUpConnection()

  const res = await client.query("UPDATE items SET inventory = inventory - 1 WHERE selection_id = $1", [selection]);

  closeConnection()

  return res.rows[0]

}

module.exports = { getItemBySelection, isItemInStock, updateInventory };
