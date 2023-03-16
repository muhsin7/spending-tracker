import {Login} from "./Login"
import {render} from "@testing-library/react";

test("renders login page correctly", () => {
    
    const root = document.createElement("div");
    ReactDOM.render(<Login />,root);

    expect(root.querySelector("h1").textContent).toBe("Login");
    
});

