import PaymentsHistory from "./PaymentsHistory";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";

export default function PaymentsPage() {
  const [token, setToken] = useToken();
  const [payments, setPayments] = useState({});

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
  alert(payments)

  return (
    <div className="payments-page">
      <h1 className="payments-header">Payments Page</h1>
      <PaymentsHistory payments={payments}/> 
    </div>
  )
}