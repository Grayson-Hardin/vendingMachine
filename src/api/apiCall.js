const express = require("express");
const purchaseFunctions = require("../utlities/purchase");

const app = express();
const port = 3001;
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.post("/vendingmachine", async (req, res) => {
  let selection = req.body.selection;
  let coins = req.body.coins;

  let response = await purchaseFunctions.purchase(coins, selection)

  let message = response.message
  let status = response.status

  res.send({ message, status});
});

app.listen(port, () => {
  console.log("API Active.");
});
