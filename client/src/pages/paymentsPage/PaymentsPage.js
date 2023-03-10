import PaymentsHistory from "./PaymentsHistory";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";

export default function PaymentsPage() {
  const [token, setToken] = useToken();
  const [payments, setPayments] = useState({});

  // Gets all the user's payments from the database
  useEffect(() => {
    axios.get('/api/payment', {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      console.log(res.data);
      setPayments(res.data);
    });
  }, []);

  return (
    <div className="payments-page">
      <h1 className="payments-header">Payments Page</h1>
      <PaymentsHistory payments={payments}/>
    </div>
  );
}