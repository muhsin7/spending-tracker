import PaymentsHistory from "./PaymentsHistory";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function PaymentsPage() {
  const [token, setToken] = useToken();
  const [payments, setPayments] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("Date (latest first)");
  const navigate = useNavigate();
  const SORT_BY_OPTIONS = [
    "Category (a -> z)",
    "Category (z -> a)",
    "Title (a -> z)",
    "Title (z -> a)",
    "Price (lowest first)",
    "Price (highest first)",
    "Date (earliest first)",
    "Date (latest first)"
  ];
  const FILTER_BY_OPTIONS = [
    "",
    "Category",
    "Title",
    "Description",
    "Price",
    "Date"
  ]

  // Gets all the user's payments from the database
  useEffect(() => {
    axios
      .get("/api/payment", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPayments(res.data);
      });
  }, []);

  // Sort the payments so that the latest payment is displayed first
  const ascendingCompare = (A, B) => {
    if (A === B) {
      return 0;
    } else {
      return A > B ? -1 : 1;
    }
  };
  payments.sort((a, b) =>
    ascendingCompare(new Date(Date.parse(a.date)), new Date(Date.parse(b.date)))
  );

  function confirmSortBy(e) {
    setSortBy(e.target.value);
  }

  function confirmFilterBy(e) {
    setFilterBy(e.target.value);
  }

  return (
    <div className="payments-page">
      <div className="payments-top">
        <h1 className="payments-header">Payments Page</h1>
        
        <div className="payments-sort-by-section">
          <span className="payments-sort-by-text">Sort by:</span>
          <select
            className="payments-sort-by"
            value={sortBy}
            onChange={(e) => confirmSortBy(e)}
          >
            {SORT_BY_OPTIONS.map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        <div className="payments-filter-by-section">
          <span className="payments-filter-by-text">Filter by:</span>
          <select
            className="payments-filter-by"
            value={filterBy}
            onChange={(e) => confirmFilterBy(e)}
          >
            {FILTER_BY_OPTIONS.map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div
        className="payments-add-payment"
        onClick={() => navigate("/addPayment")}
      >
        <span>Click to add new payment</span>
        <FaPlus className="payments-plus-icon" />
      </div>

      <PaymentsHistory
        payments={payments}
        setPayments={setPayments}
        token={token}
      />
    </div>
  );
}
