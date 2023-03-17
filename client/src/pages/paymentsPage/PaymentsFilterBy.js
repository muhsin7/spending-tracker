import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

export default function PaymentsPage(props) {
  const [filterBy, setFilterBy] = useState("");
  const [filterByInputCode, setFilterByInputCode] = useState([]);
  const [date, setDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const FILTER_BY_OPTIONS = [
    "",
    "Category",
    "Title",
    "Description",
    "Price",
    "Date",
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
        setCategories(res.data);
      });
  }, []);

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
              props.setPayments(
                props.payments.filter((payment) =>
                  categories
                    .find((category) => category._id === payment.categoryId)
                    .name.toLowerCase()
                    .includes(e.target.value)
                )
              );
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
              props.setPayments(
                props.payments.filter((payment) =>
                  payment.title.toLowerCase().includes(e.target.value)
                )
              );
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
              props.setPayments(
                props.payments.filter((payment) =>
                  payment.description.toLowerCase().includes(e.target.value)
                )
              );
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
              props.setPayments(
                props.payments.filter((payment) =>
                  ("-£" + payment.amount.toString()).includes(e.target.value)
                )
              );
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
