import Login from "../pages/Login";
import {render} from "@testing-library/react";
import user from "@testing-library/user-event"
import React from "react";
import { ReactDOM } from "react";

test("login form works correctly", async () => {
    
    const onLoginClicked = jest.fn();

    // render(<Login onLoginClicked = {onLoginClicked} />)

    // let container = null;
    // // beforeEach(() => {
    // // // setup a DOM element as a render target
    // // container = document.createElement("div");
    // // document.body.appendChild(container);
    // });

    // beforeEach(() => {
    //     onLoginClicked.mockClear();
    //     render(<Login onSubmit={onLoginClicked} />);
    // });

    const root = document.createElement("div");
    ReactDOM.renderer(<Login />,root);

    expect(root.querySelector("h1").textContent).toBe("Login");
    expect(root.querySelector("#loginButton").textContent).toBe("Login");
    expect(root.querySelector("#login-signup-link").textContent).toBe("Don't have an account?");

    
    it('onLoginClicked is called when all fields pass validation', async () => {
        user.type(getEmail(), 'johndoe@example.com');
        user.type(getPassword(), '123');
        clickSubmitButton();

        await waitFor(() => {
            expect(onLoginClicked).toHaveBeenCalledWith({
                email: 'johndoe@example.com',
                password: '123',
            });
        });

    expect(onLoginClicked).toHaveBeenCalledTimes(1);
    });

    function clickSubmitButton() {
        user.click(screen.getByRole('button'));
    }

    function getEmail() {
        return screen.getByPlaceholderText('Email');
    }

    function getPassword() {
        return screen.getByPlaceholderText('Password');
    }


});


