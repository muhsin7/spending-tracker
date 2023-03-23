import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../authentication/useToken";
import { confirmAlert } from "react-confirm-alert";
import CategoryCardEdit from "./CategoryCardEdit";
import { useEffect, useState } from "react";
import PercentageBar from "../dashboard/limits/PercentageBar";

function CategoryCard(props) {
  const ID = props.category._id;
  const TITLE = props.category.name;
  const SL = props.category.spendingLimit;
  const SL_DISPLAY = SL
    ? `£${SL.amount} / ${SL.duration.type.toLowerCase()}`
    : "No spending limit";
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  async function getSpendingLimitPercentage() {
    const payments = await axios.get("/api/payment", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    console.log(payments);

    let res = [];

    let dt = new Date();
    switch (SL.duration.type) {
      case "YEAR":
        dt = new Date(dt.getFullYear(), 0, 1);
        break;
      case "MONTH":
        dt = new Date(dt.getFullYear(), dt.getMonth(), 1);
        break;
      case "DAY":
        dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0);
        break;
      case "WEEK":
        const tempDay = new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate(),
          0
        );
        const day = tempDay.getDay();
        dt = new Date(
          tempDay.setDate(dt.getDate() - day + (day === 0 ? -6 : 1))
        );
        break;
      default:
        dt = new Date(0);
        break;
    }

    if (dt.getTime() === 0) {
      res = payments.data;
    } else {
      const today = new Date().getTime();
      payments.data.forEach((pay) => {
        const paytime = Date.parse(pay.date);
        if (paytime <= today && paytime >= dt.getTime()) {
          res.push(pay);
        }
      });
    }
    if (res) {
      const TOTAL_SPENT = res.reduce((a, b) => a + (b.amount || 0), 0);
      setTotalSpent(TOTAL_SPENT.toFixed(2));
      setPercentage(((TOTAL_SPENT / SL.amount) * 100).toFixed(1));
    }
  }

  useEffect(() => {
    if (SL) getSpendingLimitPercentage();
  });

  const deleteCategory = async () => {
    try {
      await axios.delete("/api/category/" + ID, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      window.location.reload(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
      } else if (err.message) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  };

  function handleCategoryDelete() {
    confirmAlert({
      title: TITLE,
      message: "Are you sure you want to delete this payment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCategory(),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function handleCategoryEdit() {
    setEdit(true);
  }

  function handleAddLimit() {
    navigate({
      pathname: "/addSpendingLimit",
      search: `?categoryID=${props.category._id}`,
    });
  }

  function handleEditLimit() {
    navigate({
      pathname: "/editSpendingLimit",
      search: `?categoryID=${props.category._id}`,
    });
  }

  return !edit ? (
    <div className="category-card">
      <div className="category-info">
        <div className="category-title">{TITLE}</div>
      </div>
      <div className="category-spending-limit">{SL_DISPLAY}</div>
      <div className="category-edit-delete-div">
        <button
          className="category-card-button category-edit-button"
          onClick={handleCategoryEdit}
        >
          Edit
        </button>
        <button
          className="category-card-button category-delete-button"
          onClick={handleCategoryDelete}
        >
          Delete
        </button>
      </div>
      {SL ? (
        <button
          className="category-card-button category-spending-limit-button"
          onClick={handleEditLimit}
        >
          Edit Spending Limit
        </button>
      ) : (
        <button
          className="category-card-button category-spending-limit-button"
          onClick={handleAddLimit}
        >
          Add Spending Limit
        </button>
      )}
      {SL ? (
        <span>
          {`Money spent: £${totalSpent}`}
          <PercentageBar completed={percentage} />
        </span>
      ) : undefined}
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
