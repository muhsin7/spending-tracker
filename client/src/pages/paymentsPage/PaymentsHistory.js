import PaymentCard from "./PaymentCard";
import PropTypes from "prop-types";
import axios from "axios";

export default function PaymentsHistory(props) {
  async function deletePayment(id) {
    await axios.delete("/api/payment/" + id, {
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
    props.setPayments(props.payments.filter((payment) => payment._id !== id));
  }

  const rows = [];
  props.payments.forEach((e) => {
    rows.push(
      <PaymentCard
        payment={e}
        categories={props.categories}
        deletePayment={deletePayment}
        key={e._id}
        token={props.token}
      />
    );
  });

  return <div className="payments-container">{rows}</div>;
}

PaymentsHistory.propTypes = {
  payments: PropTypes.array,
};
