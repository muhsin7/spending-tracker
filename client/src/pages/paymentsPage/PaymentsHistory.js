import PaymentCard from "./PaymentCard";
import PropTypes from 'prop-types';

export default function PaymentsHistory(props) {
  function deletePayment(id) {
    props.setPayments(props.payments.filter((payment) => payment._id !== id));
  }

  const rows = [];
  props.payments.forEach(e => {
    rows.push(<PaymentCard payment={e} deletePayment={deletePayment} key={e._id} />);
  });

  return (
    <div className="payments-container">
      {rows}
    </div>
  );
}

PaymentsHistory.propTypes = {
  payments: PropTypes.array
}