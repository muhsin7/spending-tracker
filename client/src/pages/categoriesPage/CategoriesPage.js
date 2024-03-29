import CategoryCard from "./CategoryCard";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function CategoriesPage() {
  const [token, setToken] = useToken();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/category/withSpendingLimit", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      });
  }, []);

  const rows = [];
  categories.forEach((e) => {
    rows.push(<CategoryCard category={e} key={e._id} token={token} />);
  });

  return (
    <div className="categoryPage">
      <h1 className="category-header">Categories</h1>
      <span className="payments-redirect-section">
        <div
          className="payments-add-payment payments-add-payment-1"
          onClick={() => navigate("/addCategory")}
        >
          <span>Click to add new category</span>
          <FaPlus className="payments-plus-icon" />
        </div>
        <div
          className="payments-add-payment payments-add-payment-2"
          onClick={() => navigate("/addSpendingLimit")}
        >
          <span>Click to add new spending limit</span>
          <FaPlus className="payments-plus-icon" />
        </div>
      </span>
      <div className="categories-container">{rows}</div>
    </div>
  );
}
