import AmountSpent from "./AmountSpent";
import DashboardChart from "./DashboardChart";
import TransactionsPreview from "./TransactionsPreview";

export default function Dashboard() {

    

    return (
        <div className="dashboard dashboard-grid">
            <h1 className="dashboard-header">Dashboard</h1>
            <div className="dashboard-left">
                <AmountSpent />
                <TransactionsPreview /> 
            </div>
            <div className="chart-container dashboard-right">
            <DashboardChart />
            </div>
        </div>
    )
}