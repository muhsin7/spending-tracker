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

  // Sort the payments so that the latest payment is displayed first
  const ascendingCompare = (A, B) => {
    if (A === B) {
      return 0;
    } else {
      return A > B ? -1 : 1;
    }
  };

  props.payments.sort((a, b) =>
    ascendingCompare(new Date(Date.parse(a.date)), new Date(Date.parse(b.date)))
  );

  function confirmSortBy(e) {
    setSortBy(e.target.value);
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
