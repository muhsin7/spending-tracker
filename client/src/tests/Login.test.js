import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
jest.mock("axios");

describe("Login Page tests", () => {
  let emailInput;
  let passwordInput;
  let loginButton;
  
  beforeEach(() => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    emailInput = screen.getByPlaceholderText("Email");
    passwordInput = screen.getByPlaceholderText("Password");
    loginButton = screen.getByRole("button", { name: "Login" });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Checks if login page renders correctly", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("Checks if an error message is displayed when the credentials are wrong", async () => {
    axios.post.mockRejectedValue(new Error("login failed"));

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(
      "Your credentials don't match our system!"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
