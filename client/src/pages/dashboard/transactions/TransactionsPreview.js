import { Link } from "react-router-dom";
import TransactionCard from "./TransactionCard";

export default function TransactionsPreview(props) {
    const rows = [];

    props.payments.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    props.payments.forEach(e => {
        rows.push(<TransactionCard payment={e} key={e._id} />);
    });

    return (
        <div className="transaction-section">
            <h2>Transactions</h2>
            <div className="dashboard-container preview-container">
                <div className="dashboard-transactions ">
                    {rows}
                </div>
                <Link to="/payments"><div className="all-payments btn">All Payments</div></Link>
            </div>
        </div>
    )
}