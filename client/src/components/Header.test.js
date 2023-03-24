import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

const testClick = (text) => {
  let button = screen.getByText(text.charAt(0).toUpperCase() + text.slice(1))
  fireEvent.click(button);
  expect(window.location.pathname).toBe(`/${text}`)
}

describe('Header Component (User not logged in)', () => {
  let registerButton;

  beforeEach(() => {
    render(
      <BrowserRouter initialEntries={['/']}>
        (<Header auth={[false, jest.fn()]}/>)
      </BrowserRouter>
    )
    registerButton = screen.getByRole("button", { name: "Sign up" });
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the 2 buttons and logo', () => {
    expect(registerButton).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(screen.getByText("AllGood")).toBeInTheDocument();
  });

  it('Sign Up button redirects to /register', () => {
    fireEvent.click(registerButton);
    expect(window.location.pathname).toBe("/register")
  })

  it('Login button redirects to /login', () => {
    testClick("login");
  })
});



describe('Header Component (User logged in)', () => {
  let logOutButton;
  let accountText;

  beforeEach(() => {
    render(
      <BrowserRouter>
        (<Header auth={[true, jest.fn()]}/>)
      </BrowserRouter>
    )
    accountText = screen.getByText("Account")
    logOutButton = screen.getByRole("button", { name: "Log out" });
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders header options for user and log out button', () => {
    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Limits")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(accountText).toBeInTheDocument();
    expect(logOutButton).toBeInTheDocument();
  });

  it("paymentText redirects to /payments", () => {
    testClick("payments");
  })
  it("categoriesText redirects to /categories", () => {
    testClick("categories");
  })
  // it("limitsText redirects to / limits", () => {
  //   testClick("limits");
  // })
  // it("reportsText redirects to /reports", () => {
  //   testClick("reports");
  // })
  // it("achievementsText redirects to /achievements", () => {
  //   testClick("achievements");
  // })
  it("accountText opens a popup with user details", () => {
    fireEvent.click(accountText);
    expect(screen.getByText("Account details"))
  })

  it('Log out button removes user details from localStorage and redirects user', () => {
    localStorage.setItem("exampleKey", "exampleValue")
    fireEvent.click(logOutButton);
    expect(localStorage.getItem("exampleKey")).toBeNull()
    expect(window.location.pathname).toBe("/")
  })
});
