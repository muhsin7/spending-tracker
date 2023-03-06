import { useState } from "react";
import AmountSpent from "./AmountSpent";
import TransactionsPreview from "./TransactionsPreview";

export default function Dashboard() {

    

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <AmountSpent />
            <TransactionsPreview /> 
        </div>
    )
}