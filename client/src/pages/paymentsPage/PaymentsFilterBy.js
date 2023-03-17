import { useState } from "react";
import DatePicker from "react-datepicker";

export default function PaymentsPage() {
  const [filterBy, setFilterBy] = useState("");
  const [filterByInputCode, setFilterByInputCode] = useState([]);
  const [filterByInput, setFilterByInput] = useState("");
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
            value={filterByInput}
            onChange={(e) => setFilterByInput(e.target.value)}
          />,
        ]);
        break;
      case "Title":
        setFilterByInputCode([
          <input
            value={filterByInput}
            onChange={(e) => setFilterByInput(e.target.value)}
          />,
        ]);
        break;
      case "Description":
        setFilterByInputCode([
          <input
            value={filterByInput}
            onChange={(e) => setFilterByInput(e.target.value)}
          />,
        ]);
        break;
      case "Price":
        setFilterByInputCode([
          <input
            value={filterByInput}
            onChange={(e) => setFilterByInput(e.target.value)}
          />,
        ]);
        break;
      case "Date":
        setFilterByInputCode([
          <DatePicker
            className="payment-date"
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setFilterByInput(date)}
          />,
        ]);
        break;
      default:
        console.log("ERROR");
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
      <div>{filterByInputCode}</div>
    </div>
  );
}
