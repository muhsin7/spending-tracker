import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../../authentication/useToken";

export default function BudgetCard(props) {
  const [token, setToken] = useToken();

  const [limit, setLimit] = useState({});
  const [hasLimit, setHasLimit] = useState(false);

  useEffect(() => {
    axios
      .get("/api/limit/bycategory/1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(async (res) => {
        if (res.data) {
          if (res.data.length > 0) {
            setLimit(res.data[0]);
            setHasLimit(true);
          }
        }
      });
  }, []);

  const remaining = (lim) => {
    if (hasLimit) {
      return (
        lim.amount - props.summary[lim.duration.type.toLowerCase()]
      ).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <div className="dashboard-money dashboard-container">
      {hasLimit ? (
        <>
          <div className={`dashboard-amount`}>
            £{limit ? remaining(limit) : 0}
            <sup className="warning-emoji">
              {remaining(limit) < 0 ? "⚠️" : "✅"}
            </sup>
          </div>
          <div className="dashboard-amount-description">
            left to spend{" "}
            <b>
              {limit.duration
                ? limit.duration.type.toLowerCase() === "day"
                  ? "today"
                  : "this " + limit.duration.type.toLowerCase()
                : "..."}
            </b>
          </div>
          <Link to="/editSpendingLimit/?categoryID=1">
            <div className="btn dashboard-edit-global-limit">
              Edit global spending limit
            </div>
          </Link>
        </>
      ) : (
        <Link to="/addSpendingLimit/?categoryID=1">
          <div className="btn dashboard-edit-global-limit">
            Add global spending limit
          </div>
        </Link>
      )}
    </div>
  );
}

BudgetCard.defaultProps = {
  negative: false,
  hasBudget: false,
};
