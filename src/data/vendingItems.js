const { Client } = require("pg");

async function setUpConnection(){
    const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
  })

  await client.connect();

    return client
}

async function getItemBySelection(selection) {
  console.log("getItemSelection")

  const client = await setUpConnection()

  const res = await client.query("SELECT * from items WHERE selection_id = $1", [selection]);

  await client.end()

  return res.rows[0];
}

async function isItemInStock(selection) {
  console.log("isItemInStock")

  const client = await setUpConnection()

  const res = await client.query("SELECT inventory from items WHERE selection_id = $1", [selection]);

  await client.end()

  return res.rows[0].inventory > 0
}


async function updateInventory(selection) {
  console.log("updateInventory")

  const client = await setUpConnection()

  const res = await client.query("UPDATE items SET inventory = inventory - 1 WHERE selection_id = $1", [selection]);

  await client.end()

  return res.rows[0]

}

module.exports = { getItemBySelection, isItemInStock, updateInventory };
