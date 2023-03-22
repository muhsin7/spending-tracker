import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToken } from "../../authentication/useToken";
import { confirmAlert } from 'react-confirm-alert';
import CategoryCardEdit from "./CategoryCardEdit";
import { useEffect, useState } from "react";

function CategoryCard(props) {

  const ID = props.category._id;
  const TITLE = props.category.name;
  const SL = props.category.spendingLimit
  const SL_DISPLAY = SL ? `£${SL.amount} / ${SL.duration.type}`: "No spending limit";
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);


  const deleteCategory = async () => {
    try {
      const response = await axios.delete('/api/category/' + ID, {
        headers: {
          "Authorization": "Bearer " + props.token
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
    // confirmAlert({
    //   title: TITLE,
    //   message: "Please enter the new name for the category ",
    //   buttons: [
    //     {
    //       label: "Confirm",
    //       onClick: () => editCategory()
    //     },
    //     {
    //       label: "Cancel"
    //     }
    //   ]
    // });
    setEdit(true);
  }

  function handleAddLimit() {
    navigate({
      pathname: "/addSpendingLimit",
      search: `?categoryID=${props.category._id}`
    });
  }

  function handleEditLimit() {
    navigate({
      pathname: "/editSpendingLimit",
      search: `?categoryID=${props.category._id}`
    });
  }
    
  return !edit ?(
      <div className="category-card">
        <div className="category-info">
            <div className="category-title">{TITLE}</div>
        </div>
        <div className="category-spending-limit">{SL_DISPLAY}</div>
        {SL ? <button className="category-card-button" onClick={handleEditLimit}>Edit Spending Limit</button> :
        <button className="category-card-button" onClick={handleAddLimit}>Add Spending Limit</button> }
        <button className="category-card-button" onClick={handleCategoryEdit}>Edit</button>
        <button className="category-card-button" onClick={handleCategoryDelete}>Delete </button>
      </div>
    ) : (
      <CategoryCardEdit
        category={props.category}
        setEdit={setEdit}
        token={props.token}
      />
    );



  }

export default CategoryCard;