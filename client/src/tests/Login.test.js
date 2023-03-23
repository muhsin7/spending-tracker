// import Login from "../pages/Login";
// import user from "@testing-library/user-event"
// import React from "react";
// import { ReactDOM } from "react";
// import { render, screen, waitFor, within } from '@testing-library/react';

// describe("login form works correctly", () => {
    
//     const onLoginClicked = jest.fn();

//     // render(<Login onLoginClicked = {onLoginClicked} />)

//     // let container = null;
//     // // beforeEach(() => {
//     // // // setup a DOM element as a render target
//     // // container = document.createElement("div");
//     // // document.body.appendChild(container);
//     // });

//     beforeEach(() => {
//         render(<Login onSubmit={onLoginClicked}/>);
//         onLoginClicked.mockClear();
//     });

//     // const root = document.createElement("div");
//     // ReactDOM.render(<Login />,root); 

//     // expect(root.querySelector("h1").textContent).toBe("Login");
//     // expect(root.querySelector("#loginButton").textContent).toBe("Login");
//     // expect(root.querySelector("#login-signup-link").textContent).toBe("Don't have an account?");

    
//     it('onLoginClicked is called when all fields pass validation', async () => {
//         user.type(getEmail(), 'johndoe@example.com');
//         user.type(getPassword(), '123');
//         clickSubmitButton();

//         await waitFor(() => {
//             expect(onLoginClicked).toHaveBeenCalledWith({
//                 email: 'johndoe@example.com',
//                 password: '123'
//             });
//         });

//     expect(onLoginClicked).toHaveBeenCalledTimes(1);
//     });

//     function clickSubmitButton() {
//         const loginButton = screen.getByText('login');
//         user.click(loginButton);
//     }

//     function clickSubmitButton() {
//         user.click(screen.getByRole('button'));
//       }

//     function getEmail() {
//         return screen.getByPlaceholderText('Email');
//     }

//     function getPassword() {
//         return screen.getByPlaceholderText('Password');
//     }


// });




import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Login from "../pages/Login";

jest.mock("axios");

describe("Login component", () => {
  beforeEach(() => {
    render(<Login />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the login form", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it("displays error message when login fails", async () => {
    axios.post.mockRejectedValue(new Error("login failed"));

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(
      "Your credentials don't match our system!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

//   it("sets token and auth when login succeeds", async () => {
//     const token = "test-token";
//     axios.post.mockResolvedValue({ data: { token } });
//     const setTokenMock = jest.fn();
//     const setAuthMock = jest.fn();

//     jest.spyOn(React, "useState").mockReturnValueOnce([null, setTokenMock]);
//     jest.spyOn(React, "useState").mockReturnValueOnce([null, setAuthMock]);

//     const emailInput = screen.getByPlaceholderText("Email");
//     const passwordInput = screen.getByPlaceholderText("Password");
//     const loginButton = screen.getByRole("button", { name: "login" });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(loginButton);

//     await screen.findByRole("heading", { name: "Login" });
//     expect(setTokenMock).toHaveBeenCalledWith(token);
//     expect(setAuthMock).toHaveBeenCalledWith(true);
//   });
});

