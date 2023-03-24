import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AddCategory from "../pages/AddCategory";
import { BrowserRouter } from "react-router-dom";

describe("AddCategory page tests", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AddCategory />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Checks if form renders correctly", () => {
    expect(screen.getByText("Add Category")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Name of the category")
    ).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("Checks if an error message appears if category name is not provided", () => {
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    expect(screen.getByText("Category name is required!")).toBeInTheDocument();
  });
});
