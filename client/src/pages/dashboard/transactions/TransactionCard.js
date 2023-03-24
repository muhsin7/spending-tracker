export default function TransactionCard(props) {
    const TITLE = props.payment.title;
    const DATE = new Date(Date.parse(props.payment.date)).toDateString();
    const PRICE = (Math.round(props.payment.amount * 100) / 100).toFixed(2);

  return (
    <div className="transaction-card">
      <div className="transaction-info">
        <div className="transaction-title">{TITLE}</div>
        <subtitle>{DATE}</subtitle>
      </div>
      <div className="transaction-amount">-£{PRICE}</div>
    </div>
  );
}
