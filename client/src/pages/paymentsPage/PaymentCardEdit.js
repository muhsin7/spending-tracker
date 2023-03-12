import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck } from 'react-icons/fa';
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



  // Creates an imageURL if it exists
  let imageURL = "";

  if (DOES_IMAGE_EXIST) {
    const IMAGE = props.payment.image;
    imageURL = `data:${IMAGE.contentType};base64,${IMAGE.data.toString('base64')}`;
  }



  function handleConfirm() {
    props.setEdit(false);
  }



  const [startDate, setStartDate] = useState(new Date(DATE));
  const [newCategories, setNewCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(CATEGORY_ID);
  const [newTitle, setNewTitle] = useState(TITLE);
  const [newPrice, setNewPrice] = useState(PRICE);
  const [newDescription, setNewDescription] = useState(DESCRIPTION);
  const [newImage, setNewImage] = useState(imageURL);

  // Gets all the user's categories from the database
  useEffect(() => {
    axios.get('/api/category', {
      headers: {
        "Authorization": "Bearer " + props.token
      }
    }).then((res) => {
      console.log(res.data);
      setNewCategories(res.data);
    });
  }, []);

  return (
    <div className="payment-card">
      <select
        value={newCategory}
        onChange={e => setNewCategory(e.target.value)}
      >
        {newCategories.map((option) => (
          <option key={option._id}>{option.name}</option>
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
}