import AddSpendingLimit from "./AddSpendingLimit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter  } from 'react-router-dom';
// import axios from "axios";

// jest.mock("axios");

describe("Add Spending Limit Component", () => {
    let spendingLimitName;
    let amount;
    let durationSelect;
    let categorySelect;
    let spendingLimitBtn;

    beforeEach(() => {
        // axios.mockReset();
        render(
            <BrowserRouter initialEntries={['/']}>
              (<AddSpendingLimit />)
              {/* mocks the select for user categories */}
              <select data-testid="categoryId">
                <option value="misc">Misc</option>
                <option value="general">General</option>
              </select>
            </BrowserRouter>
        )

        spendingLimitName = screen.getByPlaceholderText("Spending limit name");
        amount = screen.getByPlaceholderText("Amount");
        durationSelect = screen.getByTestId('duration');
        categorySelect = screen.getByTestId('categoryId');
        spendingLimitBtn = screen.getByText("Add spending limit");
    })

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders the page correctly with default values", () => {
        expect(screen.getByRole("heading", { name: "Add Spending Limit" })).toBeInTheDocument();
        expect(spendingLimitName).toBeInTheDocument();

        expect(amount).toBeInTheDocument();
        expect(amount).toHaveValue(0);

        //change event on duration select
        expect(durationSelect).toBeInTheDocument();
        fireEvent.change(durationSelect, { target: { value: 'MONTH' } });
        expect(durationSelect.value).toBe('MONTH');
        //"YEAR", "MONTH", "WEEK", "DAY", ""
        expect(durationSelect.length).toBe(5);
      
        //change event on category select
        expect(categorySelect).toBeInTheDocument();
        fireEvent.change(categorySelect, { target: { value: 'misc' } });
        expect(categorySelect.value).toBe('misc');
        expect(screen.getByText("Misc")).toBeInTheDocument();
        expect(categorySelect.length).toBe(2)
        
        expect(spendingLimitBtn).toBeInTheDocument();
    })

    it("displays error message when not all fields are filled", async () => {
        fireEvent.change(spendingLimitName, { target: { value: 'Misc' } });
        fireEvent.change(amount, { target: { value: 50 } });
        fireEvent.change(durationSelect, { target: { value: 'DAY' } });

        fireEvent.click(spendingLimitBtn);
        const err = await screen.findByText("Value 'categoryId' is required!");
        expect(err).toBeInTheDocument();
    })

    // it("navigates to /categories on correct inputs", async () => {
    //     fireEvent.change(spendingLimitName, { target: { value: 'Misc' } });
    //     fireEvent.change(amount, { target: { value: 50 } });
    //     fireEvent.change(durationSelect, { target: { value: 'DAY' } });
    //     fireEvent.change(categorySelect, { target: { value: 'misc' } });

    //     fireEvent.click(spendingLimitBtn);
    //     // axios.post.mockImplementation(() => {
    //     //     return Promise.resolve({ data: 'mocked data' });
    //     // });
    //     // expect(window.location.pathname).toBe("/categories");
    //     // expect(axios.post).toHaveBeenCalledWith("/api/limit", {
    //     //     headers: {
    //     //         Authorization: "Bearer token123",
    //     //     },
    //     // });
    // })
})