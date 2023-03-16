import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

export default function CategoryCardEdit(props) {
  const ID = props.category._id;
  const TITLE = props.category.name;
//   const SPENDINGLIMIT = props.category.spendingLimit
 
  const [newTitle, setNewTitle] = useState(TITLE);
//   const [newSpendingLimit, setNewSpendingLimit] = useState(SPENDINGLIMIT);

    useEffect(() => {
        console.log(newTitle)
    }, [newTitle]);

  function isChanged() {
    return (
      newTitle !== TITLE
    //   newSpendingLimit !== SPENDINGLIMIT
    );
  }

  async function handleConfirm() {
    if (!isChanged()) {
      props.setEdit(false);
      return;
    }

    let data = {
        id: props.category._id,
        name: newTitle,
        //spendingLimit: newSpendingLimit
      }
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
            className="category-title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
      </div>
      <input
            className="category-spending-limit"
            // value={newSpendingLimit}
            // onChange={(e) => setNewTitle(e.target.value)}
       />
      <button className="category-card-button" onClick={handleConfirm}>Confirm</button>
      <button className="category-card-button" onClick={() => props.setEdit(false)}>Cancel</button>
    </div>
  );

}
