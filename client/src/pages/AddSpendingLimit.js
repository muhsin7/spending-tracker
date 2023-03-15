import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";

export default function AddSpendingLimit() {
  const [newCategories, setNewCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [formValues, setFormValues] = useState({
    name: "",
    amount: 0,
    duration: "",
    categoryId: "",
  });

  useEffect(() => console.log(token), [token]);

  const onFormChange = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };

  // Gets all the user's categories from the database
  useEffect(() => {
    axios.get("/api/category", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(async (res) => {
      await setNewCategories(res.data);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/limit",
        {
          name: formValues["name"],
          amount: formValues["amount"],
          duration: {
            type: formValues["duration"]
          },
          category: formValues["categoryId"],
        }, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      ).then((res) => console.log(res));
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

  return (
    <div className="div-addCategory">
      {errorMessage && <div className="Error">{errorMessage}</div>}
      <section className="addCategoryForm">
        <h2 className="addCategoryTitle">Add Spending Limit</h2>
        <fieldset className="addCategoryFields">
          <form onSubmit={onSubmit}>
            <div className="addCategoryInputBox">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formValues["name"]}
                placeholder="Spending limit name"
                onChange={onFormChange}
                required
              />
            </div>
            <div className="addCategoryInputBox">
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={formValues["amount"]}
                placeholder="Amount"
                onChange={onFormChange}
              />
            </div>
            <div className="addCategoryInputBox">
              <select
                value={formValues["duration"]}
                name="duration"
                onChange={onFormChange}
              >
                <option key="" value=""></option>
                {["YEAR", "MONTH", "DAY", "WEEK"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="addCategoryInputBox">
              <select
                value={formValues["categoryId"]}
                name="categoryId"
                onChange={onFormChange}
              >
                <option key="" value=""></option>
                {newCategories.map((option) => (
                  <option key={option._id} value={option._id}>{option.name}</option>
                ))}
              </select>
            </div>
            <input
              onClick={onSubmit}
              type="button"
              className="btn btn-header"
              value="Add spending limit"
            />
          </form>
        </fieldset>
      </section>
    </div>
  );
}
