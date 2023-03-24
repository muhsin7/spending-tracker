import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { toast } from "react-toastify";

function AddCategory() {
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useToken();
  const [categoryValue, setCategoryValue] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    //Check all values are filled in
    if (categoryValue === "") {
      setErrorMessage("Category name is required!");
      return;
    }

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

    try {
      const response = await axios.post(
        "/api/category",
        {
          name: categoryValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        if (response.data.achievements.length !== 0) {
          response.data.achievements.forEach((achievement) =>
            achievementNotif("New achievement unlocked!\n" + achievement.title)
          );
        }
        navigate("/categories");
      }
    } catch (err) {
      console.log(err.response.data);
      setErrorMessage(err.response.data.error);
    }
  };

  return (
    <div className="div-inputForm">
      <section className="inputForm">
        <h2 className="inputFormTitle">Add Category</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <fieldset className="inputFormFields">
          <form>
            <div className="inputFormInputBox">
              <input
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                placeholder="Name of the category"
                required
              />
            </div>
            <button
              id="addCategoryButton"
              className="inputFormButton"
              onClick={onSubmit}
            >
              Add
            </button>
          </form>
        </fieldset>
      </section>
    </div>
  );
}

export default AddCategory;
