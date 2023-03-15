import PaymentsHistory from "./PaymentsHistory";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { useNavigate } from "react-router-dom";

export default function PaymentsPage() {
  const [token, setToken] = useToken();
  const [payments, setPayments] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const navigate = useNavigate();

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

  function confirmFilterBy(e) {
    setFilterBy(e.target.value);
  }

  return (
    <div className="payments-page">
      <div className="payments-top">
        <h1 className="payments-header">Payments Page</h1>
        <div className="payments-filter-by-section">
          <span className="payments-filter-by-text">Filter by:</span>
          <select
            className="payments-filter-by"
            value={filterBy}
            onChange={(e) => confirmFilterBy(e)}
          >
            <option key="" value=""></option>
            {["category", "title", "description", "price", "date"].map(
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
        <span className="payments-plus-icon">+</span>
      </div>

      <PaymentsHistory
        payments={payments}
        setPayments={setPayments}
        token={token}
      />
    </div>
  );
}
