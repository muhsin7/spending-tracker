import TransactionCard from "./TransactionCard";

export default function TransactionsPreview(props) {
    const rows = [];
    props.payments.forEach(e => {
    rows.push(<TransactionCard payment={e} key={e.id} />);
    });

    return (
        <>
            <h1>Transactions</h1>
            <div className="dashboard-transactions dashboard-container">
                {rows}
                <div className="all-payments btn btn-header">All Payments</div>
            </div>
        </>
    )
}