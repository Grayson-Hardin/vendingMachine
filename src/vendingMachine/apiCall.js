const express = require("express");
const purchaseFunctions = require("../vendingMachine/utlities/purchase.js");

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

// app.get("/vendingmachine/selection/:selectionID", (req, res) => {
//     let selection = req.params.selectionID;
//     let coins = req.body.coins;

//     purchase(coins, selection);

//     res.send(purchase());
// });

// app.get("/test", (req, res) => {
//     // testConsolelog();
//     purchase();
// });

app.post("/vendingmachine", (req, res) => {
  let selection = req.body.selection;
  let coins = req.body.coins;

  console.log(coins);
  let message = purchaseFunctions.purchase(coins, selection).message;
  let status = purchaseFunctions.purchase(coins, selection).status;

  res.send({ message: message, status: status });
});

app.listen(port, () => {
  console.log("Received.");
});

// vendingMachineAPI();
// const express = require("express");
// const app = express();
// const port = 3001;

// app.use(express.json());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// //http://localhost:3001/vendingmachine/selection/2
// app.get("/vendingmachine/selection/:selectionID", (req, res) => {
//     let selection = req.params.selectionID;
//     let coins = req.body.coins;

//     console.log(body);

//     res.send(selection);
// });

// // http://localhost:3001/vendingmachine
// app.post("/vendingmachine", (req, res) => {
//     let selection = req.body.coins;
//     let coins = req.body.coins;

//     console.log(req.body);

//     res.send(selection);
// });

// app.listen(port, () => {
//     console.log("Received.");
// });
