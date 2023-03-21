import TransactionCard from "./TransactionCard";
import { useNavigate } from "react-router-dom";

export default function TransactionsPreview(props) {
    const navigate = useNavigate();
    const rows = [];
    props.payments.forEach(e => {
    rows.push(<TransactionCard payment={e} key={e._id} />);
    });

    return (
        <div className="transaction-section">
            <h2>Transactions</h2>
            <div className="dashboard-transactions dashboard-container">
                {rows}
                <div className="all-payments btn btn-header" onClick={() => navigate("/payments")}>All Payments</div>
            </div>
        </div>
    )
}