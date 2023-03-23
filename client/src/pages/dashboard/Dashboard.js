import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToken } from "../../authentication/useToken";
import { useUser } from "../../authentication/useUser";
import AccountCard from "./cards/AccountCard";
import AmountSpent from "./cards/AmountSpent";
import CategoryPieChart from "./charts/CategoryPieChart";
import DashboardChart from "./charts/DashboardChart";
import DashboardLimits from "./limits/DashboardLimits";
import TransactionsPreview from "./transactions/TransactionsPreview";

export default function Dashboard() {
    const [token, setToken] = useToken();
    const [payments, setPayments] = useState([]);
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     setUser(userHook);
    // }, [userHook]);


    useEffect(() => {
        axios.get('/api/user/profile', {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((res) => {
            // console.log(res.data);
            setUser(res.data);
        });
      }, []);

    useEffect(() => {
        axios.get('/api/payment', {
        headers: {
            "Authorization": "Bearer " + token
        }
        }).then((res) => {
        // console.log(res.data);
        console.log(res.data);
        // res.data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        setPayments(res.data);
        });
    }, []);

    
    // return <DashboardChart payments={payments} />;
    return (
            <div className="dashboard dashboard-grid">
                <div className="dashboard-header">
                    <h1>Overview</h1>
                    <h3>Hi{user.name ? ` ${user.name.split(" ")[0]}, ` : "! "}get your summary of your transactions here</h3>
                </div>
                <div className="dashboard-left">
                    <div className="dashboard-row">
                        <AmountSpent payments={payments} />
                        <div className="chart-container">
                            <div className="line-chart noselect dashboard-left">
                                <DashboardChart payments={payments} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="dashboard-left-bottom">
                        </div>      */}
                </div>
                <div className="dashboard-right pie-chart">
                    <AccountCard />
                </div>
                <div className="dashboard-bottom-left">
                        <TransactionsPreview payments={payments} /> 
                </div>
                <div className="dashboard-bottom-middle">
                        <DashboardLimits payments={payments} /> 
                </div>
                <div className="dashboard-right pie-chart">
                    <h2>Category Data</h2>
                    <CategoryPieChart payments={payments}/>
                </div>
            </div>
    )
}