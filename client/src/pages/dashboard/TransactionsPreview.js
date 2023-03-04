import TransactionCard from "./TransactionCard";

export default function TransactionsPreview() {

    return (
        <div className="dashboard-transactions dashboard-container">
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
        </div>
    )
}