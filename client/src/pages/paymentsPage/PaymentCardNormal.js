import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";

export default function PaymentCard(props) {
  const TITLE = props.payment.title;
  const DATE_STRING = new Date(props.payment.date).toLocaleDateString();
  const DESCRIPTION = props.payment.description;
  const DOES_IMAGE_EXIST = props.payment.hasOwnProperty("image");
  const CATEGORY_ID = props.payment.categoryId;
  // Rounds the price to 2 d.p.
  const PRICE = (Math.round(props.payment.amount * 100) / 100).toFixed(2);


  
  const [category, setCategory] = useState({});

  // Gets the corresponding category from the database
  useEffect(() => {
    axios.get("/api/category/" + CATEGORY_ID, {
      headers: {
        "Authorization": "Bearer " + props.token
      }
    }).then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, []);

  const CATEGORY_NAME = category.name;

  

  // Creates an imageURL if it exists
  let imageURL = "";

  if (DOES_IMAGE_EXIST) {
    const IMAGE = props.payment.image;
    const IMAGE_BASE64 = String.fromCharCode(...new Uint8Array(IMAGE.data.data));
    imageURL = `data:${IMAGE.contentType};base64,${IMAGE_BASE64}`;
  }



  function handleDelete() {
    confirmAlert({
      title: TITLE,
      message: "Are you sure you want to delete this payment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => props.deletePayment(props.payment._id)
        },
        {
          label: "No"
        }
      ]
    });
  }

  return (
    <div className="payment-card">
      <span className="payment-category">{CATEGORY_NAME}</span>

      <div className="payment-info">
        <div className="payment-card-top">
          <span className="payment-title">{TITLE}</span>
          <span className="payment-amount">{"-£" + PRICE}</span>
        </div>

        <div className="payment-card-middle">
          <span className="payment-description">{DESCRIPTION}</span>
          <div className="payment-edit-delete-icons">
            <FaTrash className="payment-delete-icon" onClick={handleDelete} />
            <FaEdit className="payment-edit-icon" onClick={() => props.setEdit(true)} />
          </div>
        </div> 
        
        <div className="payment-card-bottom">
          <span className="payment-date">{DATE_STRING}</span>
          {DOES_IMAGE_EXIST && (
            <Popup
              trigger={<button className="payment-image-button">View image</button>}
              contentStyle={{
                width: "75%",
                height: "75%",
                backgroundColor: "rgba(30, 30, 30, 0.6)",
                border: "none"
              }}
              modal
              nested
            >
              <img className="payment-image" src={imageURL} />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
}