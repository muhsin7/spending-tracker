import PaymentCard from "./PaymentCard";
import PropTypes from 'prop-types';
import axios from "axios";

export default function PaymentsHistory(props) {
  function deletePayment(id) {
    axios.delete('/api/payment/' + id, {
      headers: {
        "Authorization": "Bearer " + props.token
      }
    }).then((res) => {
      console.log(res.data);
    });
    props.setPayments(props.payments.filter((payment) => payment._id !== id));
  }

  const rows = [];
  props.payments.forEach(e => {
    rows.push(<PaymentCard payment={e} deletePayment={deletePayment} key={e._id} token={props.token} />);
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