import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from 'axios';
import AddPayment from "../pages/AddPayment"
import { BrowserRouter } from "react-router-dom";

describe("AddPayment", () => {
  // let axiosPostSpy;

  // beforeEach(() => {
  //   axiosPostSpy = jest.spyOn(axios, "post").mockResolvedValue({ status: 201 });
  // });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  test("renders the input form", async () => {
    // Render the component
    render(<BrowserRouter><AddPayment /></BrowserRouter>);

    // Make sure the title input is present
    expect(screen.getByPlaceholderText(/Payment name/i)).toBeInTheDocument();

    // Make sure the description input is present
    expect(screen.getByPlaceholderText(/Payment description/i)).toBeInTheDocument();

    // Make sure the amount input is present
    expect(screen.getByPlaceholderText(/Amount/i)).toBeInTheDocument();

    // Make sure the submit button is present
    expect(screen.getByRole('button', {name: /Add payment/i})).toBeInTheDocument();
  });

  test("displays an error message when required fields are not filled in", async () => {
    // Render the component
    render(<BrowserRouter><AddPayment /></BrowserRouter>);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/Payment name/i), {
      target: { value: "" },
    });

    fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
      target: { value: "" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', {name: /Add payment/i}));

    // Make sure an error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Value 'title' is required!/i)).toBeInTheDocument();
    });
  });

  // test('finds select element by name (to find categoryId)', () => {
  //   const { container } = render(<BrowserRouter><AddPayment /></BrowserRouter>);
  //   const selectElement = container.querySelector('select[name="categoryId"]');
  //   expect(selectElement).toBeInTheDocument();
  // });

  // test("submits the form when all required fields are filled in", async () => {
  //   const mockCategories = [
  //     { id: 1, name: 'Category 1' },
  //     { id: 2, name: 'Category 2' },
  //     { id: 3, name: 'Category 3' },
  //   ];

  //   // Mock the axios post method
  //   jest.spyOn(axios, "get").mockResolvedValue({ data: mockCategories });

  //   // Render the component
  //   const { container } = render(<BrowserRouter><AddPayment /></BrowserRouter>);

  //   // Fill in the form
  //   const titleInput = screen.getByPlaceholderText(/Payment name/i);
  //   const descriptionInput = screen.getByPlaceholderText(/Payment description/i);
  //   const amountInput = screen.getByPlaceholderText(/amount/i);
  //   const categoryInput = container.querySelector('select[name="categoryId"]');

  //   const titleValue = 'Test Payment';
  //   const descriptionValue = 'Test Payment Description';
  //   const amountValue = 10.99;
  //   const categoryIdValue = mockCategories[0].id;

  //   fireEvent.change(titleInput, { target: { value: titleValue } });
  //   fireEvent.change(descriptionInput, { target: { value: descriptionValue } });
  //   fireEvent.change(amountInput, { target: { value: amountValue } });
  //   fireEvent.change(categoryInput, { target: { value: categoryIdValue } });

  //   // Submit the form
  //   fireEvent.click(screen.getByRole('button', {name: /Add payment/i}));

  //   // Verify that the mockedAxios function was called with the expected parameters  
  //   await waitFor(() => {
  //     expect(axiosPostSpy).toHaveBeenCalledWith(
  //       "/api/payment",
  //       {
  //         title: titleValue,
  //         description: descriptionValue,
  //         amount: amountValue,
  //         image: undefined,
  //         categoryId: categoryIdValue,
  //         date: expect.any(Date),
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer ",
  //         },
  //       }
  //     );
  //   });

  //   // Make sure we navigate to the payments page
  //   expect(window.location.pathname).toBe("/payments");
  // });
});
