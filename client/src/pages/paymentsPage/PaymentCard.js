import PaymentCardNormal from "./PaymentCardNormal";
import PaymentCardEdit from "./PaymentCardEdit";
import { useState } from "react";

export default function PaymentCard(props) {
  const [edit, setEdit] = useState(false);

  return !edit ? (
    <PaymentCardNormal
      payment={props.payment}
      categories={props.categories}
      setEdit={setEdit}
      deletePayment={props.deletePayment}
      token={props.token}
    />
  ) : (
    <PaymentCardEdit
      payment={props.payment}
      categories={props.categories}
      setEdit={setEdit}
      token={props.token}
    />
  );
}
