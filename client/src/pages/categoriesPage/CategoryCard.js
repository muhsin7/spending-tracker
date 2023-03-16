import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToken } from "../../authentication/useToken";
import { confirmAlert } from 'react-confirm-alert';

function CategoryCard(props) {

  const ID = props.category._id;
  const TITLE = props.category.name;
  const SPENDINGLIMIT = props.category.spendingLimit
  const [token, setToken] = useToken();
  const navigate = useNavigate();



  const deleteCategory = async () => {
    try {
      const response = await axios.delete('/api/category/' + ID, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      window.location.reload(false);

  } catch (err) {
      if(err.response) {
          console.log(err.response);
      } else if (err.message) {
          console.log(err.message);
      } else {
          console.log(err);
      }
  }
  }

  function handleCategoryDelete() {
    confirmAlert({
      title: TITLE,
      message: "Are you sure you want to delete this payment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCategory()
        },
        {
          label: "No"
        }
      ]
    });
  }

  function handleCategoryEdit() {
    confirmAlert({
      title: TITLE,
      message: "Please enter the new name for the category ",
      buttons: [
        {
          label: "Confirm",
          onClick: () => editCategory()
        },
        {
          label: "Cancel"
        }
      ]
    });
  }

  const editCategory = () => {

  }
 
    
  return (
      <div className="category-card">
        <div className="category-info">
            <div class="category-title">{TITLE}</div>
        </div>
        <div className="category-spending-limit">Spending Limit: {SPENDINGLIMIT}</div>
        <button className="category-card-button" onClick={handleCategoryEdit}>Edit</button>
        <button className="category-card-button" onClick={handleCategoryDelete}>Delete </button>
      </div>
    );
  }

export default CategoryCard;