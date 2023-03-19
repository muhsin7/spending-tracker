import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../../authentication/useToken";
import AmountCard from "./AmountCard";
import BudgetCard from "./BudgetCard";

export default function AmountSpent() {

    const [summary, setSummary] = useState({});
    const [token, setToken] = useToken();


    useEffect(() => {
        axios.get('/api/payment/summary', {
        headers: {
            "Authorization": "Bearer " + token
        }
        }).then((res) => {
        // console.log(res.data);
        setSummary(res.data);
        });
    }, []);


    return (
        <div className="dashboard-amount-cards">
            <AmountCard summary={summary}/>
            <BudgetCard negative={true}  hasBudget={true} />
        </div>
    )
}