import { useState } from "react";

export default function PaymentsPage() {
  const [filterBy, setFilterBy] = useState("");
  const FILTER_BY_OPTIONS = [
    "",
    "Category",
    "Title",
    "Description",
    "Price",
    "Date",
  ];

  function confirmFilterBy(e) {
    setFilterBy(e.target.value);
  }

  return (
    <div className="payments-filter-by-section">
      <span className="payments-filter-by-text">Filter by:</span>
      <select
        className="payments-filter-by"
        value={filterBy}
        onChange={(e) => confirmFilterBy(e)}
      >
        {FILTER_BY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
