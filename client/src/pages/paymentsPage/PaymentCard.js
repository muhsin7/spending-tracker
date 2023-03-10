import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PaymentCard(props) {
  const TITLE = props.payment.title;
  // const DATE = new Date(props.payment.createdAt.$date.$numberLong).toLocaleString();
  const DATE = new Date().toLocaleString();
  const DESCRIPTION = props.payment.description;
  const DOES_IMAGE_EXIST = props.payment.hasOwnProperty('image');
  const CATEGORY_ID = props.payment.categoryId;
  // Rounds the price to 2 d.p.
  const PRICE = (Math.round(props.payment.amount * 100) / 100).toFixed(2);


  
  const [token, setToken] = useToken();
  const [category, setCategory] = useState({});

  // Gets the corresponding category from the database
  useEffect(() => {
    axios.get('/api/category/' + CATEGORY_ID, {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, []);

  const CATEGORY_NAME = category.name;

  

  let imageURL = "";

  if (DOES_IMAGE_EXIST) {
    const IMAGE = props.payment.image;
    imageURL = `data:${IMAGE.contentType};base64,${IMAGE.data.toString('base64')}`;
    console.log(imageURL);
  }



  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleConfirm() {

  }

  function handleDelete() {

  }

  const NORMAL_MODE = (
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
            <FaEdit className="payment-edit-icon" onClick={handleEdit} />
          </div>
        </div> 
        
        <div className="payment-card-bottom">
          <span className="payment-date">{DATE}</span>
          {DOES_IMAGE_EXIST && (
            <Popup trigger={<button className="payment-image-button">View image</button>} position="left" contentStyle={{ width: 'auto'}}>
              <img src={imageURL} />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );

  const [startDate, setStartDate] = useState(new Date(DATE));

  const EDIT_MODE = (
    <div className="payment-card">
      <input
        className="payment-category"
        value={CATEGORY_NAME}
      />

      <div className="payment-info">
        <div className="payment-card-top">
          <input
            className="payment-title"
            value={TITLE}
          />
          <input
            className="payment-amount"
            value={"-£" + PRICE}
          />
        </div>

        <div className="payment-card-middle">
          <input
            className="payment-description"
            value={DESCRIPTION}
          />
          <div className="payment-edit-delete-icons">
            <FaCheck className="payment-confirm-icon" onClick={handleConfirm} />
          </div>
        </div> 
        
        <div className="payment-card-bottom">
          <DatePicker
            className="payment-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {DOES_IMAGE_EXIST && (
            <Popup trigger={<button className="payment-image-button">View image</button>} position="left" contentStyle={{ width: 'auto'}}>
              <img src={imageURL} />
            </Popup>
          )}
        </div>
      </div>
    </div>
  );

  return ((!edit) ? NORMAL_MODE : EDIT_MODE);
}