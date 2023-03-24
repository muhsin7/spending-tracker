import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AddSpendingLimit() {
  const [category, setCategory] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [formValues, setFormValues] = useState({
    name: "",
    amount: 0,
    duration: "",
    categoryId: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [spendingLimit, setSpendingLimit] = useState("");
  const catID = searchParams.get("categoryID");

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
    const res = axios
      .get(`/api/category/${catID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        setCategory(res.data);
        axios
          .get(`/api/limit/byCategory/${catID}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res2) => {
            const spendingLimit = res2.data[0];
            setSpendingLimit(spendingLimit._id);
            setFormValues({
              ...formValues,
              name: spendingLimit.name,
              amount: spendingLimit.amount,
              duration: spendingLimit.duration.type,
              categoryId: spendingLimit.category,
            });
          });
      })
      .catch((err) => {
        //If catID is 1, then they are trying to edit the global spending limit
        if (catID !== "1") {
          navigate("/categories");
        } else {
          setCategory({
            _id: "1",
            name: "Global",
          });

          axios
            .get(`/api/limit/byCategory/${catID}`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res2) => {
              console.log(res2);
              const spendingLimit = res2.data[0];
              setSpendingLimit(spendingLimit._id);
              setFormValues({
                ...formValues,
                name: spendingLimit.name,
                amount: spendingLimit.amount,
                duration: spendingLimit.duration.type,
                categoryId: "1",
              });
            })
            .catch((err) => {
              navigate("/categories");
            });
        }
      });
  }, []);

  const onDelete = async (e) => {
    const response = await axios.delete(`/api/limit/${spendingLimit}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    console.log(response);
    if (response.status === 200) navigate("/categories");
  };

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
          type: formValues["duration"],
        },
      };

      let req;

      //Set global spending limit if chosen
      if (formValues["categoryId"] === "1") {
        req = BASE_REQ;
      } else {
        req = { ...BASE_REQ, category: formValues["categoryId"] };
      }

      const response = await axios.patch(`/api/limit/${spendingLimit}`, req, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(response);
      if (response.status === 200) navigate("/categories");
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="div-inputForm">
      <section className="inputForm">
        <h2 className="inputFormTitle">Edit Spending Limit</h2>
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
              >
                <option key="" value=""></option>
                {["YEAR", "MONTH", "WEEK", "DAY"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputFormInputBox">
              <select
                value={formValues["categoryId"]}
                name="categoryId"
                onChange={onFormChange}
                disabled
              >
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              </select>
            </div>
            <input
              onClick={onSubmit}
              type="button"
              className="btn-form-submit"
              value="Edit"
            />
            <input
              onClick={onDelete}
              type="button"
              className="btn-form-submit btn-danger"
              value="Delete"
            />
          </form>
        </fieldset>
      </section>
    </div>
  );
}
