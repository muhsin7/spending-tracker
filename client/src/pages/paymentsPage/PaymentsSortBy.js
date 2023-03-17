import { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentsSortBy(props) {
  const [sortBy, setSortBy] = useState("Date (latest first)");
  const [categories, setCategories] = useState([]);
  const SORT_BY_OPTIONS = [
    "Category (a -> z)",
    "Category (z -> a)",
    "Title (a -> z)",
    "Title (z -> a)",
    "Price (lowest first)",
    "Price (highest first)",
    "Date (earliest first)",
    "Date (latest first)",
  ];

  // Gets all the user's categories from the database
  useEffect(() => {
    axios
      .get("/api/category", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      });
  }, []);

  // Sort the payments so that the latest payment is displayed first
  function ascendingCompare(A, B) {
    if (A === B) {
      return 0;
    } else {
      return A < B ? -1 : 1;
    }
  }

  // Sort the payments so that the latest payment is displayed first
  function descendingCompare(A, B) {
    if (A === B) {
      return 0;
    } else {
      return A > B ? -1 : 1;
    }
  }

  function aCategoryFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) =>
        ascendingCompare(
          categories.find((category) => category._id === a.categoryId).name,
          categories.find((category) => category._id === b.categoryId).name
        )
      ),
    ]);
  }

  function zCategoryFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) =>
        descendingCompare(
          categories.find((category) => category._id === a.categoryId).name,
          categories.find((category) => category._id === b.categoryId).name
        )
      ),
    ]);
  }

  function earliestDateFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) =>
        ascendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);
  }

  function latestDateFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) =>
        descendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);
  }

  function confirmSortBy(e) {
    setSortBy(e.target.value);
    switch (e.target.value) {
      case "Category (a -> z)":
        aCategoryFirst();
        break;
      case "Category (z -> a)":
        zCategoryFirst();
        break;
      case "Title (a -> z)":
        break;
      case "Title (z -> a)":
        break;
      case "Price (lowest first)":
        break;
      case "Price (highest first)":
        break;
      case "Date (earliest first)":
        earliestDateFirst();
        break;
      case "Date (latest first)":
        latestDateFirst();
        break;
      default:
        console.log("ERROR");
        break;
    }
  }

  return (
    <div className="payments-sort-by-section">
      <span className="payments-sort-by-text">Sort by:</span>
      <select
        className="payments-sort-by"
        value={sortBy}
        onChange={(e) => confirmSortBy(e)}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
