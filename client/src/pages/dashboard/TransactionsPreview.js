import TransactionCard from "./TransactionCard";

export default function TransactionsPreview() {

    return (
        <>
            <h1>Transactions</h1>
            <div className="dashboard-transactions dashboard-container">
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
                <TransactionCard />
            </div>
        </>
    )
}