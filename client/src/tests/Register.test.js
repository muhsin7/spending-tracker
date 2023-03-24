import Register from "../pages/Register";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { findRenderedComponentWithType } from "react-dom/test-utils";

describe('Header Component (User not logged in)', () => {
  let nameInput;
  let emailInput;
  let passwordInput;
  let password2Input;
  let registerButton;

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )

    nameInput = screen.getByPlaceholderText("Name")
    emailInput = screen.getByPlaceholderText("Email")
    passwordInput =screen.getByPlaceholderText("Password")
    password2Input = screen.getByPlaceholderText("Confirm password")
    registerButton = screen.getByRole("button", { name: "Create Account" })
  })

  afterEach(() => {
      jest.resetAllMocks();
  })

  it("renders the register page correctly", () =>{
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(password2Input).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  })

  it("displays error message when password and password2 inputs don't match", async () => {
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(password2Input, { target: { value: "password" } });
    fireEvent.click(registerButton);

    const err = await screen.findByText("Passwords do not match");
    expect(err).toBeInTheDocument();
  })
});
