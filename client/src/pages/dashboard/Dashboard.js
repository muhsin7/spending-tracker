import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
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

  useEffect(() => {
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/payment", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setPayments(res.data);
      });
  }, []);

  const getMonthStart = () => {
    const dt = new Date();
    return new Date(dt.getFullYear(), dt.getMonth(), 1);
  };

  return (
    <div className="dashboard dashboard-grid">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <h3>
          Hi{user.name ? ` ${user.name.split(" ")[0]}, ` : "! "}get your summary
          of your transactions here
        </h3>
      </div>
      <div className="dashboard-left">
        <div className="dashboard-row">
          <AmountSpent payments={payments} />
          <div className="chart-container">
            <div className="line-chart noselect dashboard-left">
              <DashboardChart payments={payments} start={getMonthStart()} />
            </div>
          </div>
        </div>
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
        <CategoryPieChart payments={payments} start={getMonthStart()} />
      </div>
    </div>
  );
}
