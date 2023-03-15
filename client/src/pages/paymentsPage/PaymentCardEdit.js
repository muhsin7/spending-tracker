import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import { Buffer } from "buffer";

export default function PaymentCard(props) {
  const TITLE = props.payment.title;
  const DATE = new Date(props.payment.date);
  const DESCRIPTION = props.payment.description;
  const DOES_IMAGE_EXIST = props.payment.hasOwnProperty("image");
  const CATEGORY_ID = props.payment.categoryId;
  // Rounds the price to 2 d.p.
  const PRICE = (Math.round(props.payment.amount * 100) / 100).toFixed(2);

  // Creates an imageURL if it exists
  let imageURL = "";

  if (DOES_IMAGE_EXIST) {
    const IMAGE = props.payment.image;
    const IMAGE_BASE64 = String.fromCharCode(
      ...new Uint8Array(IMAGE.data.data)
    );
    imageURL = `data:${IMAGE.contentType};base64,${IMAGE_BASE64}`;
  }

  const [newTitle, setNewTitle] = useState(TITLE);
  const [newDescription, setNewDescription] = useState(DESCRIPTION);
  const [newDate, setNewDate] = useState(DATE);
  const [newImageURL, setNewImageURL] = useState(imageURL);
  const [newPrice, setNewPrice] = useState(PRICE);
  const [newCategories, setNewCategories] = useState([]);
  const [newCategoryID, setNewCategoryID] = useState(CATEGORY_ID);

  function isSameDate(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isChanged() {
    return (
      newTitle !== TITLE ||
      newDescription !== DESCRIPTION ||
      !isSameDate(newDate, DATE) ||
      newImageURL !== imageURL ||
      newPrice !== PRICE ||
      newCategoryID !== CATEGORY_ID
    );
  }

  async function handleConfirm() {
    // No need to return here as setting edit as false will change the payment card back to normal
    if (!isChanged()) props.setEdit(false);

    if (!newPrice.match(/^\d+(.\d+)?$/)) {
      alert("The price entered isn't a valid number!");
      return;
    }

    let data = {
      id: props.payment._id,
      title: newTitle,
      description: newDescription,
      date: newDate,
      amount: newPrice,
      categoryId: newCategoryID,
    };

    if (newImageURL !== imageURL)
      data.image = {
        data: Buffer.from(
          newImageURL.substring(newImageURL.indexOf(",") + 1).toString("base64")
        ),
        contentType: newImageURL.substring(
          newImageURL.indexOf(":") + 1,
          newImageURL.indexOf(";")
        ),
      };

    await axios
      .patch("/api/payment/" + props.payment._id, data, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      });

    window.location.reload();
  }

  // Gets all the user's categories from the database
  useEffect(() => {
    axios
      .get("/api/category", {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNewCategories(res.data);
      });
  }, []);

  function storeNewImage() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => setNewImageURL(reader.result), false);

    if (file) reader.readAsDataURL(file);
  }

  return (
    <div className="payment-card">
      <select
        value={newCategoryID}
        onChange={(e) => setNewCategoryID(e.target.value)}
      >
        {newCategories.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
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
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
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
            <FaTimes
              className="payment-cancel-icon"
              onClick={() => props.setEdit(false)}
            />
          </div>
        </div>

        <div className="payment-card-bottom">
          <DatePicker
            className="payment-date"
            selected={newDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setNewDate(date)}
          />
          {DOES_IMAGE_EXIST && (
            <Popup
              trigger={
                <button className="payment-image-button">View image</button>
              }
              contentStyle={{
                width: "75%",
                height: "75%",
                backgroundColor: "rgba(30, 30, 30, 0.6)",
                border: "none",
              }}
              modal
              nested
            >
              <img className="payment-image" src={newImageURL} />
            </Popup>
          )}
          <input
            className="payment-image-button"
            type="file"
            accept="image/*"
            onChange={storeNewImage}
          />
        </div>
      </div>
    </div>
  );
}
