import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VendingMachine from "./App";
import * as lib from "./service";
import userEvent from "@testing-library/user-event";

process.env.DEBUG_PRINT_LIMIT = 1000000;
describe("vending machine component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should test that Vending Machine header is displayed", () => {
    render(<VendingMachine />);

    const actual = screen.getByText("Vending Machine");

    expect(actual).toBeInTheDocument();
  });

  it("should check that cost header is in the document", () => {
    render(<VendingMachine />);

    const actual = screen.getByText("$1.00 per item");

    expect(actual).toBeInTheDocument();
  });

  it("should check that total is in the document", () => {
    render(<VendingMachine />);

    const actual = screen.getByText("Total: $0.00");

    expect(actual).toBeInTheDocument();
  });

  it("should return a insufficent funds message when attempting to click item without providing money", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Insufficent funds",
      status: "error",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Mountain Dew"));

    const actual = await screen.findByText("Insufficent funds");

    expect(spyPurchase).toHaveBeenCalled();
  });
  it("should return item is out of stock on button click", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Item out of stock",
      status: "error",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Root Beer"));

    const actual = await screen.findByText("Item out of stock");

    expect(spyPurchase).toHaveBeenCalled();
  });

  it("should return item when purchase is sucessful", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Mountain Dew Purchased",
      status: "success",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Mountain Dew"));

    const actual = await screen.findByText("Mountain Dew Purchased");

    expect(spyPurchase).toHaveBeenCalled();
  });

  it("should return item with change when purchase is sucessful and money is more than item price", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Mountain Dew Purchased. Change returned: $0.15",
      status: "success",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Mountain Dew"));

    const actual = await screen.findByText(
      "Mountain Dew Purchased. Change returned: $0.15"
    );

    expect(spyPurchase).toHaveBeenCalled();
  });

  it("should check that total is in the document", async () => {
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("$0.05"));

    const actual = await screen.findByText("Total: $0.05");

    expect(actual).toBeInTheDocument();
  });

  it("should assert that tokens are being passed to the purchase function", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Mountain Dew Purchased",
      status: "success",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("$0.05"));
    userEvent.click(screen.getByLabelText("Mountain Dew"));

    await screen.findByText("Mountain Dew Purchased");
    expect(spyPurchase).toHaveBeenCalledWith("A1", [
      { diameter: 21.21, weight: 5 },
    ]);
  });

  it("should return a insufficient funds message not enough money is provided", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Insufficient funds: item costs $1",
      status: "error",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Mountain Dew"));

    const actual = await screen.findByText("Insufficient funds: item costs $1");

    expect(spyPurchase).toHaveBeenCalled();
  });

  it("should ad 0.10 cents to total on button clicks", async () => {
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("$0.10"));

    const actual = await screen.findByText("Total: $0.10");

    expect(actual).toBeInTheDocument();
  });

  it("should add $0.25 to total on button click", async () => {
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("$0.25"));
    const actual = await screen.findByText("Total: $0.25");

    expect(actual).toBeInTheDocument();
  });

  it("should add $1.00 to total on button click", async () => {
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("$1.00"));
    const actual = await screen.findByText("Total: $1.00");

    expect(actual).toBeInTheDocument();
  });

  it("should reset Total to 0 on button click", async () => {
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("done"));

    const actual = await screen.findByText("Total: $0.00");

    expect(actual).toBeInTheDocument();
  });

  it("should reset message on button click", async () => {
    const spyPurchase = jest.spyOn(lib, "purchaseItem");
    spyPurchase.mockReturnValue({
      message: "Insufficient funds: item costs $1",
      status: "error",
    });
    render(<VendingMachine />);

    userEvent.click(screen.getByLabelText("Mountain Dew"));
    const actual = await screen.findByText("Insufficient funds: item costs $1");
    expect(actual).toBeInTheDocument();

    userEvent.click(screen.getByLabelText("done"));
    const errorMessage = screen.queryByText(
      "Insufficient funds: item costs $1"
    );

    expect(errorMessage).not.toBeInTheDocument();
  });
});
