import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToken } from "../../authentication/useToken";
import AmountSpent from "./AmountSpent";
import DashboardChart from "./DashboardChart";
import TransactionsPreview from "./TransactionsPreview";

export default function Dashboard() {
    const [token, setToken] = useToken();
    const [payments, setPayments] = useState([]);

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

    
    // return <DashboardChart payments={payments} />;
    return (
            <div className="dashboard dashboard-grid">
                {/* <h1 className="dashboard-header">Dashboard</h1> */}
                <div className="dashboard-left">
                    <AmountSpent payments={payments} />
                    <div className="chart-container">
                        <DashboardChart payments={payments} />
                    </div>
                </div>
                <div className="dashboard-right">
                    <TransactionsPreview payments={payments} />       
                </div>
            </div>
    )
}