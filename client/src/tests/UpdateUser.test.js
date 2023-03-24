import UpdateUser from "../pages/UpdateUser";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';

describe('Update User component', () => {

  beforeEach(() => {
    render(
      <BrowserRouter initialEntries={['/']}>
        <UpdateUser />
      </BrowserRouter>
    )
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the page correctly", () => {
    expect(screen.getByRole("heading", { name:"Edit Profile Details" })).toBeInTheDocument(); 
    expect(screen.getByPlaceholderText("Name:"));
    expect(screen.getByPlaceholderText("Enter a new password, otherwise leave blank:"));
    expect(screen.getByRole("button", { name:"Confirm" })).toBeInTheDocument();
  })

//   it("renders the page correctly", () => {
//     fireEvent.click(screen.getByRole("button", { name:"Confirm" }))
//     expect(data.toEqual({""}))
//   })
});



