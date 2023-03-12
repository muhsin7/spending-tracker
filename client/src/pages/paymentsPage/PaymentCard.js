import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  

  // Creates an imageURL if it exists
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
    console.log("asdfasdf");
    confirmAlert({
      title: TITLE,
      message: "Are you sure you want to delete this payment?",
      buttons: [
        {
          label: "Yes",
          onClick: deletePayment
        },
        {
          label: "No"
        }
      ]
    });
  }

  function deletePayment() {

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
  const [newCategories, setNewCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(CATEGORY_ID);
  const [newTitle, setNewTitle] = useState(TITLE);
  const [newPrice, setNewPrice] = useState(PRICE);
  const [newDescription, setNewDescription] = useState(DESCRIPTION);
  const [newImage, setNewImage] = useState([]);

  // Gets all the user's categories from the database
  useEffect(() => {
    axios.get('/api/category', {
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      console.log(res.data);
      setNewCategories(res.data);
    });
  }, []);

  const EDIT_MODE = (
    <div className="payment-card">
      <select
        value={newCategory}
        onChange={e => setNewCategory(e)}
      >
        {newCategories.map((option) => (
          <option key={option}>{option.name}</option>
        ))}
      </select>

      <div className="payment-info">
        <div className="payment-card-top">
          <input
            className="payment-title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            className="payment-amount"
            pattern="^\d+(.\d+)?$"
            value={newPrice}
            onChange={(e) =>
              setNewPrice((v) => (e.target.validity.valid ? e.target.value : v))
            }
          />
        </div>

        <div className="payment-card-middle">
          <input
            className="payment-description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
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
          <input
            className="payment-image-button"
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage([...e.target.files])}
          />
        </div>
      </div>
    </div>
  );

  return ((!edit) ? NORMAL_MODE : EDIT_MODE);
}