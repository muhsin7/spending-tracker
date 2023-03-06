export default function PaymentCard(props) {
  let title = props.payment.title;
  let date = "THIS IS A PLACEHOLDER FOR THE DATE";
  let price = props.payment.amount;

  return (
    <div className="payment-card">
      <div className="payment-info">
        <div className="payment-title">{title}</div>
        <subtitle>{date}</subtitle>
      </div>
      <div className="payment-amount">{price}</div>
    </div>
  )
}