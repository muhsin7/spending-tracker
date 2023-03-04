import { useState } from "react";
import PaymentsHistory from "./PaymentsHistory";

export default function PaymentsPage() {
    return (
        <div className="payments-page">
            <h1 className="payments-header">Payments Page</h1>
            <PaymentsHistory /> 
        </div>
    )
}