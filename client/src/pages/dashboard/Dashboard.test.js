import Dashboard from "./Dashboard";
import { render, screen } from "@testing-library/react";

  describe("Dashboard component", () => {
    beforeEach(() => {
        delete window.ResizeObserver;
        window.ResizeObserver = jest.fn().mockImplementation(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
    }))
    render(<Dashboard />)
});
  
    it("renders main dashboard component", () => {
        expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
        expect(screen.getByText(/get your summary of your transactions here/i)).toBeInTheDocument();
    })
    it("renders AmountSpent that renders Amountcard and BudgetCard", () => {
        expect(screen.getByText(/spent/i)).toBeInTheDocument();
        expect(screen.getByText(/left to spend/i)).toBeInTheDocument();
    })
    it("renders DashboardChart", () => {
        expect(screen.getByText(/Cumulative data/i)).toBeInTheDocument();
    })
    // it("renders CategoryPieChart", () => {
    //     expect(screen.getByTestId("categoryPieChart")).toBeInTheDocument();
    // })
    it("renders TransactionsPreview that renders transactionscard", () => {
        expect(screen.getByRole("heading", { name: "Transactions" })).toBeInTheDocument();
    })
    it("renders DashboardLimits", () => {
        expect(screen.getByText("Spending Limits")).toBeInTheDocument();
    })
  })
