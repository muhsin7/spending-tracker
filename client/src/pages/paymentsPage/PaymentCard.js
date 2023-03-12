import PaymentCardNormal from "./PaymentCardNormal";
import PaymentCardEdit from "./PaymentCardEdit";
import { useState } from "react";

export default function PaymentCard(props) {
  const [edit, setEdit] = useState(false);

  return ((!edit)
    ? <PaymentCardNormal payment={props.payment} edit={edit} setEdit={setEdit}/>
    : <PaymentCardEdit payment={props.payment} edit={edit} setEdit={setEdit}/>);
}