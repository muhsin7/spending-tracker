export default function PaymentCard(props) {
  let title = props.payment.title;
  let date = "THIS IS A PLACEHOLDER FOR THE DATE";
  let description = props.payment.description;

  // Rounds the price to 2 d.p.
  let price = (Math.round(props.payment.amount * 100) / 100).toFixed(2);

  return (
    <div className="payment-card">
      <div className="payment-info">
        <div className="payment-card-top">
          <span className="payment-title">{title}</span>
          <span className="payment-amount">{"-£" + price}</span>
        </div>
        <span className="payment-description">{description}</span>
        <span className="payment-date">{date}</span>
      </div>
    </div>
  )
}