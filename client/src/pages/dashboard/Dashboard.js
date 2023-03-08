import AmountSpent from "./AmountSpent";
import DashboardChart from "./DashboardChart";
import TransactionsPreview from "./TransactionsPreview";

export default function Dashboard() {

    

    return (
        <div className="dashboard dashboard-grid">
            {/* <h1 className="dashboard-header">Dashboard</h1> */}
            <div className="dashboard-left">
                <AmountSpent />
                <div className="chart-container">
                    <DashboardChart />
                </div>
            </div>
            <div className="dashboard-right">
                <TransactionsPreview /> 
                
            </div>
        </div>
    )
}