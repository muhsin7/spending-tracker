import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { Buffer } from "buffer";
import Background from "./Background";
import { toast } from "react-toastify";

function AddPayment() {
  const navigate = useNavigate();
  const [newCategories, setNewCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    amount: NaN,
    image: "",
    date: new Date(),
    categoryId: "",
  });

  const requiredValues = {
    title: true,
    description: true,
    amount: true,
    image: false,
    date: true,
    categoryId: true,
  };

  const [newImageURL, setNewImageURL] = useState("");

  const [isDateChosen, setDateChosen] = useState(false);

  useEffect(() => console.log(token), [token]);

  function getCatNameByID(id) {
    return newCategories.filter((cat) => cat._id === id)[0].name;
  }

  function storeNewImage() {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => setNewImageURL(reader.result), false);

    if (file) reader.readAsDataURL(file);
  }

  const handleFileRead = async () => {
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => ({
        ...formValues,
        image: reader.result,
      }),
      false
    );

    if (file) reader.readAsDataURL(file);
  };

  const onFormChange = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value =
      target.type === "file" ? await handleFileRead() : target.value;
    const name = target.name;

    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log(formValues);
  };

  const selectDate = async (event) => {
    setDateChosen(true);
    onFormChange(event);
  }

  // Gets all the user's categories from the database
  useEffect(() => {
    axios
      .get("/api/category", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        setNewCategories(res.data);
      });
  }, []);

  const getSpendingLimitPercentage = async (catID) => {
    const response = await axios.get(`/api/limit/byCategory/${catID}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const SL = response.data[0];
    if (!SL) return 0;

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
      return (
        (res.reduce((a, b) => a + (b.amount || 0), 0) / SL.amount) *
        100
      ).toFixed(1);
    }
  };

  const achievementNotif = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 5000,
      toastStyle: "#1CFCB9",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const errorNotif = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const warnNotif = (text) => {
    toast.warn(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmit = async (e) => {
    //Check all values are filled in
    for (let name in formValues) {
      if (
        requiredValues[name] &&
        (formValues[name] === "" || formValues[name] === 0)
      ) {
        setErrorMessage(`Value '${name}' is required!`);
        return;
      }
    }

    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/payment",
        {
          title: formValues["title"],
          description: formValues["description"],
          amount: formValues["amount"],
          image:
            newImageURL === ""
              ? undefined
              : {
                  data: Buffer.from(
                    newImageURL
                      .substring(newImageURL.indexOf(",") + 1)
                      .toString("base64")
                  ),
                  contentType: newImageURL.substring(
                    newImageURL.indexOf(":") + 1,
                    newImageURL.indexOf(";")
                  ),
                },
          categoryId: formValues["categoryId"],
          date: formValues["date"],
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);

      const globalPercentage = await getSpendingLimitPercentage("1");
      const categoryPercentage = await getSpendingLimitPercentage(
        formValues["categoryId"]
      );

      console.log(globalPercentage);
      console.log(categoryPercentage);

      if (globalPercentage > 80) {
        if (globalPercentage > 100)
          errorNotif("You have exceeded your global spending limit!");
        else
          warnNotif("You are close to exceeding your global spending limit!");
      }
      if (categoryPercentage > 80) {
        if (categoryPercentage > 100)
          errorNotif(
            `You have exceeded your spending limit for '${getCatNameByID(
              formValues["categoryId"]
            )}!'`
          );
        else
          warnNotif(
            `You are close to exceeding your spending limit for '${getCatNameByID(
              formValues["categoryId"]
            )}!'`
          );
      }

      if (response.status === 201) {
        if (response.data.achievements.length !== 0) {
          response.data.achievements.forEach((achievement) =>
            achievementNotif("New achievement unlocked!\n" + achievement.title)
          );
        }
        navigate("/payments");
      }
    } catch (err) {
      if (err.response.data.error === "PayloadTooLargeError")
        setErrorMessage("File size is too large!");
      else if (err.response.data.message)
        setErrorMessage(err.response.data.message);
      else if (err.response.data.error)
        setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="div-inputForm">
      <Background />
      <section className="inputForm">
        <h2 className="inputFormTitle">Add Payment</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <fieldset className="inputFormFields">
          <form onSubmit={onSubmit}>
            <div className="inputFormInputBox">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formValues["title"]}
                placeholder="Payment name"
                onChange={onFormChange}
                required
              />
            </div>
            <div className="inputFormInputBox">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formValues["description"]}
                placeholder="Payment description"
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
                required
              />
            </div>
            <div className="inputFormInputBox">
              <select
                value={formValues["categoryId"]}
                name="categoryId"
                id="categoryId"
                className={
                  formValues["categoryId"] === "" ? "form-select" : ""
                }
                onChange={onFormChange}
              >
                <option key="" value="" className="form-select">
                  Select a category...
                </option>
                {newCategories.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputFormInputBox">
              <input
                type="date"
                className={(isDateChosen) ? "form-control" : "form-control form-select"}
                id="date"
                name="date"
                value={formValues["date"]}
                placeholder="Date"
                onChange={selectDate}
              />
            </div>
            <div className="inputFormInputBox">
              <input
                className="form-control form-file-upload"
                id="image"
                type="file"
                accept="image/*"
                onChange={storeNewImage}
              />
            </div>
            <input
              onClick={onSubmit}
              type="button"
              className="btn btn-header"
              value="Add payment"
              id="addPaymentButton"
            />
          </form>
        </fieldset>
      </section>
    </div>
  );
}

export default AddPayment;
