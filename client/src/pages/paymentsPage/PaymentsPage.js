import { useState } from "react";
import PaymentsHistory from "./PaymentsHistory";

export default function PaymentsPage() {
    return (
        <div className="paymentsPage">
            <h1>Payments Page</h1>
            <PaymentsHistory /> 
        </div>
    )
}