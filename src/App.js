import "./styles/app.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DoneIcon from "@mui/icons-material/Done";
import NoDrinksIcon from "@mui/icons-material/NoDrinks";
import { purchaseItem } from "./api/service";

function VendingMachine() {
  const [showMessage, setShowMessage] = useState(null);
  const [selection, setSelection] = useState();
  const [payment, setPayment] = useState(0);
  const [coins, setCoins] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const resetState = () => {
    setOpen();
    setPayment(0);
    setCoins([]);
    setShowMessage(null);
  };

  const handleSubmit = async (selection) => {
    const message = await purchaseItem(selection, coins);

    if (message.status === "error") {
      setStatus("error");
    }

    if (message.status === "success") {
      setStatus("success");
      resetState();
    }

    setOpen(true);
    setShowMessage(message.message);
    setSelection(selection);
  };

  const addCoin = (coin, diameter, weight) => {
    setPayment(payment + coin);
    let newCoins = [...coins, { diameter: diameter, weight: weight }];
    setCoins(newCoins);
  };

  return (
    <Box width={"100"}>
      <Paper elevation={5} className="box">
        {" "}
        <h1>Vending Machine</h1>
        <h3>$1.00 per item</h3>
        <Button
          // startIcon={<SportsBarIcon />}
          aria-label="Mountain Dew"
          color="inherit"
          sx={{ m: ".5rem" }}
          variant="contained"
          value="Mountain Dew"
          onClick={() => handleSubmit("A1")}
        >
          A1
        </Button>
        <Button
          // startIcon={<NoDrinksIcon />}
          aria-label="Root Beer"
          color="inherit"
          sx={{ m: ".5rem" }}
          variant="contained"
          value="Root Beer"
          onClick={() => handleSubmit("A2")}
        >
          A2
        </Button>
        <Button
          // startIcon={<LocalBarIcon />}
          aria-label="Dr Pepper"
          color="inherit"
          sx={{ m: ".5rem" }}
          variant="contained"
          value="Dr Pepper"
          onClick={() => handleSubmit("A3")}
        >
          A3
        </Button>
        <div>
          <Button
            aria-label="Coke"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Coke"
            onClick={() => handleSubmit("B1")}
          >
            B1
          </Button>
          <Button
            aria-label="Pepsi"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Pepsi"
            onClick={() => handleSubmit("B2")}
          >
            B2
          </Button>
          <Button
            aria-label="Sprite"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Sprite"
            onClick={() => handleSubmit("B3")}
          >
            B3
          </Button>
        </div>
        <div>
          <Button
            aria-label="Diet Coke"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Diet Coke"
            onClick={() => handleSubmit("C1")}
          >
            C1
          </Button>
          <Button
            aria-label="Diet Mountain Dew"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Diet Mountain Dew"
            onClick={() => handleSubmit("C2")}
          >
            C2
          </Button>
          <Button
            aria-label="Diet Pepsi"
            color="inherit"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="Diet Pepsi"
            onClick={() => handleSubmit("C4")}
          >
            C4
          </Button>
        </div>
        <div className="paymentButtons">
          <Button
            aria-label="$0.05"
            startIcon={<AttachMoneyIcon />}
            color="warning"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="0.05"
            onClick={() => addCoin(0.05, 21.21, 5.0)}
          >
            0.05
          </Button>
          <Button
            aria-label="$0.10"
            startIcon={<AttachMoneyIcon />}
            color="warning"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="0.10"
            onClick={() => addCoin(0.1, 17.91, 2.268)}
          >
            0.10
          </Button>
          <Button
            aria-label="$0.25"
            startIcon={<AttachMoneyIcon />}
            color="warning"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="0.25"
            onClick={() => addCoin(0.25, 24.26, 5.67)}
          >
            0.25
          </Button>
          <Button
            aria-label="$1.00"
            startIcon={<AttachMoneyIcon />}
            color="warning"
            sx={{ m: ".5rem" }}
            variant="contained"
            value="1.00"
            onClick={() => addCoin(1.0, 26.49, 8.1)}
          >
            1.00
          </Button>
        </div>
        <p className="totalPayment">Total: ${payment.toFixed(2)} </p>
        <div className="done">
          <Button
            aria-label="done"
            startIcon={<DoneIcon />}
            color="success"
            variant="contained"
            value="Done"
            onClick={() => resetState()}
          >
            Done
          </Button>
        </div>
        <Snackbar
          className="alert"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
        >
          <Alert severity={status} sx={{ width: "100%" }}>
            {showMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default VendingMachine;
