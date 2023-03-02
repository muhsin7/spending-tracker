import { useState } from "react";

export default function Dashboard() {

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
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-money">
                <div className="dashboard-amount">£ 42</div>
                <div className="dashboard-amount-description">
                    <form>
                        <label for="duration">spent { dropdownDuration === "day" ? "" : "this" } </label>
                        <select onChange={setOption} id="amount-duraton" name="duration">
                            { durationElements }
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}