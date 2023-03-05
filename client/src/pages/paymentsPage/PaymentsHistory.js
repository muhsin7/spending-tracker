import PaymentCard from "./PaymentCard";

export default function PaymentsHistory(props) {
  return (
    <div className="payments-container">
      <PaymentCard
        title="Maccies burger and chips"
        date="1st January 2023"
        price="- £1.99"
      />
    </div>
  )
}