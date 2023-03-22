import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import CategoryCard from "../pages/categoriesPage/CategoryCard";

jest.mock("axios");

describe("CategoryCard", () => {
  const category = {
    _id: "1234",
    name: "Food",
    spendingLimit: {
      amount: 100,
      duration: {
        type: "MONTH",
      },
    },
  };

  beforeEach(() => {
    axios.get.mockReset();
  });

  it("should render the category name", () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByText(category.name)).toBeInTheDocument();
  });

  it("should render the spending limit", () => {
    render(<CategoryCard category={category} />);
    expect(screen.getByText(`£${category.spendingLimit.amount} / ${category.spendingLimit.duration.type.toLowerCase()}`)).toBeInTheDocument();
  });

  it("should call the delete API when the delete button is clicked", async () => {
    axios.delete.mockResolvedValueOnce({});

    render(<CategoryCard category={category} token="token123" />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledWith("/api/category/1234", {
      headers: {
        Authorization: "Bearer token123",
      },
    });
    await screen.findByText("Are you sure you want to delete this payment?");
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);

    expect(axios.delete).toHaveBeenCalledTimes(1);
  });

  it("should navigate to the edit spending limit page when the edit spending limit button is clicked", () => {
    const navigateMock = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => navigateMock,
    }));

    render(<CategoryCard category={category} />);
    const editSpendingLimitButton = screen.getByText("Edit Spending Limit");
    fireEvent.click(editSpendingLimitButton);

    expect(navigateMock).toHaveBeenCalledWith({
      pathname: "/editSpendingLimit",
      search: `?categoryID=${category._id}`,
    });
  });
});
