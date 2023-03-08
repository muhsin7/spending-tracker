import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PaymentCard(props) {
  const TITLE = props.payment.title;
  const DATE = "THIS IS A PLACEHOLDER FOR THE DATE";
  const DESCRIPTION = props.payment.description;
  const DOES_IMAGE_EXIST = props.payment.hasOwnProperty('image');
  
  // Rounds the price to 2 d.p.
  const PRICE = (Math.round(props.payment.amount * 100) / 100).toFixed(2);

  let imageURL = "";

  if (DOES_IMAGE_EXIST) {
    const IMAGE = props.payment.image;
    imageURL = `data:${IMAGE.contentType};base64,${IMAGE.data.toString('base64')}`;
    console.log(imageURL);
    // DISPLAY THE IMAGE
  }

  return (
    <div className="payment-card">
      <div className="payment-info">
        <div className="payment-card-top">
          <span className="payment-title">{TITLE}</span>
          <span className="payment-amount">{"-£" + PRICE}</span>
        </div>
        <span className="payment-description">{DESCRIPTION}</span>
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
  )
}