import PaymentCard from "./PaymentCard";

export default function PaymentsHistory(props) {
  function deletePayment(id) {
    props.setPayments(props.payments.filter((payment) => payment.id !== id));
  }

  const rows = [];
  props.payments.forEach(e => {
    rows.push(<PaymentCard payment={e} deletePayment={deletePayment} />);
  });

  return (
    <div className="payments-container">
      {rows}
    </div>
  );
}