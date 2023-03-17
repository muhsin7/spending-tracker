import { useState } from "react";
import DatePicker from "react-datepicker";

export default function PaymentsPage() {
  const [filterBy, setFilterBy] = useState("");
  const [filterByInputCode, setFilterByInputCode] = useState([]);
  const [date, setDate] = useState(null);
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
    switch (e.target.value) {
      case "":
        setFilterByInputCode([]);
        break;
      case "Category":
        setFilterByInputCode([
          <input
            className="payments-filter-by-input"
            key="Category"
            onChange={(e) => {
              const INPUT = e.target.value;
            }}
          />,
        ]);
        break;
      case "Title":
        setFilterByInputCode([
          <input
            className="payments-filter-by-input"
            key="Title"
            onChange={(e) => {
              const INPUT = e.target.value;
            }}
          />,
        ]);
        break;
      case "Description":
        setFilterByInputCode([
          <input
            className="payments-filter-by-input"
            key="Description"
            onChange={(e) => {
              const INPUT = e.target.value;
            }}
          />,
        ]);
        break;
      case "Price":
        setFilterByInputCode([
          <input
            className="payments-filter-by-input"
            key="Price"
            onChange={(e) => {
              const INPUT = e.target.value;
            }}
          />,
        ]);
        break;
      default:
        // Default will occur when the date option is selected
        break;
    }
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
      <div>
        {filterBy !== "Date" ? (
          filterByInputCode
        ) : (
          <DatePicker
            className="payment-date"
            dateFormat="dd/MM/yyyy"
            key="Date"
            selected={date}
            onChange={(date) => {
              setDate(date);
            }}
          />
        )}
      </div>
    </div>
  );
}
