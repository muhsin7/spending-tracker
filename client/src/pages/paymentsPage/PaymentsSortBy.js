import { useState } from "react";

export default function PaymentsSortBy(props) {
  const [sortBy, setSortBy] = useState("Date (latest first)");
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

  function ascendingCompare(A, B) {
    if (A === B) {
      return 0;
    } else {
      return A < B ? -1 : 1;
    }
  }

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
          props.categories.find((category) => category._id === a.categoryId)
            .name,
          props.categories.find((category) => category._id === b.categoryId)
            .name
        )
      ),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        ascendingCompare(
          props.categories.find((category) => category._id === a.categoryId)
            .name,
          props.categories.find((category) => category._id === b.categoryId)
            .name
        )
      ),
    ]);
  }

  function zCategoryFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) =>
        descendingCompare(
          props.categories.find((category) => category._id === a.categoryId)
            .name,
          props.categories.find((category) => category._id === b.categoryId)
            .name
        )
      ),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        descendingCompare(
          props.categories.find((category) => category._id === a.categoryId)
            .name,
          props.categories.find((category) => category._id === b.categoryId)
            .name
        )
      ),
    ]);
  }

  function aTitleFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) => ascendingCompare(a.title, b.title)),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        ascendingCompare(a.title, b.title)
      ),
    ]);
  }

  function zTitleFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) => descendingCompare(a.title, b.title)),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        descendingCompare(a.title, b.title)
      ),
    ]);
  }

  function lowestPriceFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) => ascendingCompare(a.amount, b.amount)),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        ascendingCompare(a.amount, b.amount)
      ),
    ]);
  }

  function highestPriceFirst() {
    props.setPayments([
      ...props.payments.sort((a, b) => descendingCompare(a.amount, b.amount)),
    ]);

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
        descendingCompare(a.amount, b.amount)
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

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
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

    props.setDefaultPayments([
      ...props.defaultPayments.sort((a, b) =>
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
        aTitleFirst();
        break;
      case "Title (z -> a)":
        zTitleFirst();
        break;
      case "Price (lowest first)":
        lowestPriceFirst();
        break;
      case "Price (highest first)":
        highestPriceFirst();
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
