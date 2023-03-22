import PaymentsHistory from "./PaymentsHistory";
import PaymentsSortBy from "./PaymentsSortBy";
import PaymentsFilterBy from "./PaymentsFilterBy";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function PaymentsPage() {
  const [token, setToken] = useToken();
  const [payments, setPayments] = useState([]);
  const [defaultPayments, setDefaultPayments] = useState([]);
  const [categories, setCategories] = useState([]);
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
        const DATA = res.data.sort((a, b) => {
          const A = new Date(Date.parse(a.date));
          const B = new Date(Date.parse(b.date));
          if (A === B) {
            return 0;
          } else {
            return A > B ? -1 : 1;
          }
        });

        setPayments(DATA);
        setDefaultPayments(DATA);
      });
  }, []);

  // Gets all the user's categories from the database
  useEffect(() => {
    axios
      .get("/api/category", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  return (
    <div className="payments-page">
      <div className="payments-top">
        <h1 className="payments-header">Payments</h1>

        <span>
          <PaymentsSortBy
            payments={payments}
            setPayments={setPayments}
            defaultPayments={defaultPayments}
            setDefaultPayments={setDefaultPayments}
            categories={categories}
            token={token}
          />
          <PaymentsFilterBy
            defaultPayments={defaultPayments}
            setPayments={setPayments}
            categories={categories}
            token={token}
          />
        </span>
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
        categories={categories}
        token={token}
      />
    </div>
  );
}
