import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function CategoryCard(props) {

  const ID = props.category.id;
  const TITLE = props.category.title;
  const SPENDINGLIMIT = props.category.spendingLimit


  const deleteCategory = async () => {
    const response = await axios.delete('/api/category/' + ID);
    navigate ("/categories");
  }

  const editCategory = () => {

  }
 
    
  return (
      <div className="category-card">
        <div className="category-info">
            <div class="category-title">{TITLE}</div>
        </div>
        <div className="category-spending-limit">Spending Limit: {SPENDINGLIMIT}</div>
        <button className="category-card-button" onClick={editCategory}>Edit</button>
        <button className="category-card-button" onClick={deleteCategory}>Delete </button>
      </div>
    );
  }

export default CategoryCard;