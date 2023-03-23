// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import axios from "axios";
// import CategoriesPage from "../pages/categoriesPage/CategoriesPage";
// import CategoryCard from "../pages/categoriesPage/CategoryCard";
// import { BrowserRouter } from 'react-router-dom';

// jest.mock("axios");

// describe("CategoriesPage", () => {

//   beforeEach(() => {
//     render(<BrowserRouter>
//         <CategoriesPage />
//         </BrowserRouter>)
//    });

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("displays a list of categories", async () => {
//     const mockCategories = [
//       { _id: "1", name: "Category 1", spendingLimit: 100 },
//       { _id: "2", name: "Category 2", spendingLimit: 200 },
//     ].mockImplementation(() => Promise.resolve());
//     axios.get.mockResolvedValue({ data: mockCategories });

//     render(<CategoriesPage />);

//     const categoryCards = await screen.findAllByTestId("category-card");

//     expect(categoryCards.length).toBe(mockCategories.length);
//     categoryCards.forEach((card, i) => {
//       expect(card).toHaveTextContent(mockCategories[i].name);
//       expect(card).toHaveTextContent(`Spending limit: ${mockCategories[i].spendingLimit}`);
//     });
//   });

//   it("navigates to add category page on add category click", () => {
//     const navigate = jest.fn().mockImplementation(() => Promise.resolve());

//     userEvent.click(getByText(/add new category/i));

//     expect(navigate).toHaveBeenCalledWith("/addCategory");
//   });

//   it("navigates to add spending limit page on add spending limit click", () => {
//     const navigate = jest.fn().mockImplementation(() => Promise.resolve());

//     userEvent.click(getByText(/add new spending limit/i));

//     expect(navigate).toHaveBeenCalledWith("/addSpendingLimit");
//   });
// });