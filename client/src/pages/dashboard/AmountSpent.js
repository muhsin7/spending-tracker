import { useState } from "react";

export default function AmountSpent() {

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
                <div className="dashboard-amount">£42</div>
                <div className="dashboard-amount-description">
                    <form>
                        <label for="duration">spent { dropdownDuration === "day" ? "" : "this" } </label>
                        <select onChange={setOption} id="amount-duraton" name="duration" className="duration-selector">
                            { durationElements }
                        </select>
                    </form>
                </div>
            </div>
    )
}