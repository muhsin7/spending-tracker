import { useState } from "react";

export default function BudgetCard(props) {

    const durations = ["day", "week", "month", "year"];

    const [dropdownDuration, setDropdownDuration] = useState(durations[0]);

    const durationElements = [];

    
    durations.forEach(length => {
        durationElements.push(<option value={length}>{length==="day" ? "today" : length}</option>)
    });

    function setOption(event) {
        setDropdownDuration(event.target.value);
    }

    return (
            <div className="dashboard-money dashboard-container">
                {
                    props.hasBudget ? (
                    <>
                    <div className={`dashboard-amount ${props.negative ? "error" : ""}`}>{props.negative ? "-" : ""}£42</div>
                    <div className="dashboard-amount-description">
                        <form>
                            <label for="duration">left to spend { dropdownDuration === "day" ? "" : "this" } </label>
                            <select onChange={setOption} id="amount-duraton" name="duration" className="duration-selector">
                                { durationElements }
                            </select>
                        </form>
                    </div>
                    </>
                    ) : (
                        <div>Add a budget here</div>
                    )
                }
                
            </div>
    )
}

BudgetCard.defaultProps = {
    negative: false,
    hasBudget: false
}