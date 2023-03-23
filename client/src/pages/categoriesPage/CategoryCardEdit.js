import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CategoryCardEdit(props) {
  const TITLE = props.category.name;
  const [newTitle, setNewTitle] = useState(TITLE);

  useEffect(() => {
    console.log(newTitle);
  }, [newTitle]);

  function isChanged() {
    return newTitle !== TITLE;
  }

  async function handleConfirm() {
    if (!isChanged()) {
      props.setEdit(false);
      return;
    }

    let data = {
      id: props.category._id,
      name: newTitle,
    };
    await axios
      .patch("/api/category/" + props.category._id, data, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      })
      .then((res) => {
        console.log(res.data);
      });

    window.location.reload();
  }

  return (
    <div className="category-card">
      <div className="category-info">
        <input
          className="category-edit-input"
          id="category-card-edit-title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="category-edit-buttons">
        <button
          className="category-card-button category-confirm-button"
          id="confirmNewTitle"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="category-card-button category-cancel-button"
          onClick={() => props.setEdit(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
