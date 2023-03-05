export default function PaymentCard(props) {
  return (
    <div className="payment-card">
      <div className="payment-info">
        <div class="payment-title">{props.title}</div>
        <subtitle>{props.date}</subtitle>
      </div>
      <div className="payment-amount">{props.price}</div>
    </div>
  )
}