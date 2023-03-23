import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    axios.get("/api/category/noSpendingLimit", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(async (res) => {
      console.log(res.data);
      let catList = res.data;
      catList.push({_id: "1", name: "Global"}) //Global spending limit will have id value 1
      await setNewCategories(catList);
    });
  }, []);

  const onSubmit = async (e) => {

    //Check all values are filled in
    for (let name in formValues) {
      console.log(name);
      if (formValues[name] === "" || formValues[name] === 0) {
        console.log("fail");
        setErrorMessage(`Value '${name}' is required!`);
        return;
      }
    }
  
    try {
      const BASE_REQ = {
        name: formValues["name"],
        amount: formValues["amount"],
        duration: {
          type: formValues["duration"]
        },
      };

      let req;

      //Set global spending limit if chosen
      if (formValues["categoryId"] === "1") {
        req = BASE_REQ
      }
      else {
        req = {...BASE_REQ, category: formValues["categoryId"]}
      }

      const response = await axios
        .post("/api/limit", req,  {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);
      if (response.status === 201) navigate("/categories");

    } catch (err) {
      console.log(err.response.data)
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="div-inputForm">
      <section className="inputForm">
        <h2 className="inputFormTitle">Add Spending Limit</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <fieldset className="inputFormFields">
          <form onSubmit={onSubmit}>
            <div className="inputFormInputBox">
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
            <div className="inputFormInputBox">
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
            <div className="inputFormInputBox">
              <select
                value={formValues["duration"]}
                name="duration"
                onChange={onFormChange}
                data-testid="duration"
              >
                <option key="" value=""></option>
                {["YEAR", "MONTH", "DAY", "WEEK"].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="inputFormInputBox">
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
