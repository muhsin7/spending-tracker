import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../../../authentication/useToken";
import { Link } from "react-router-dom";

export default function BudgetCard(props) {
    const [token, setToken] = useToken();
    // const durations = ["day", "week", "month", "year"];

    // const [dropdownDuration, setDropdownDuration] = useState(durations[0]);

    const durationElements = [];

    const [limit, setLimit] = useState({});
    const [hasLimit, setHasLimit] = useState(false);

    useEffect(() => {
        axios.get("/api/limit/bycategory/1", {
          headers: {
            Authorization: "Bearer " + token,
          },
        }).then(async (res) => {
          if(res.data) {
            if(res.data.length > 0) {
                setLimit(res.data[0]);
                setHasLimit(true);
            }
          }
        });
      }, []);

    const remaining = (lim) => {
        if(hasLimit) {
            return (lim.amount - props.summary[lim.duration.type.toLowerCase()]).toFixed(2);
        } else {
            return 0;
        }
    }


    
    // durations.forEach(length => {
    //     durationElements.push(<option value={length}>{length==="day" ? "today" : length}</option>)
    // });

    // function setOption(event) {
    //     setDropdownDuration(event.target.value);
    // }

    return (
            <div className="dashboard-money dashboard-container">
                {
                    hasLimit ? (
                    <>
                    {/* <div className={`dashboard-amount ${props.negative ? "error" : ""}`}>{props.negative ? "-" : ""}£42</div> */}
                    <div className={`dashboard-amount`}>£{limit ? remaining(limit) : 0}<sup className="warning-emoji">{remaining(limit) < 0 ? "⚠️" : "✅"}</sup></div>
                    <div className="dashboard-amount-description">
                        left to spend <b>{ limit.duration ? (limit.duration.type.toLowerCase() === "day" ? "today" : "this"+limit.duration.type.toLowerCase()) : "..." }</b>
                    </div>
                    </>
                    ) : (
                        <Link to="/addSpendingLimit?categoryID=1"><div>Add a budget here</div></Link>
                    )
                }
                
            </div>
    )
}

BudgetCard.defaultProps = {
    negative: false,
    hasBudget: false
}