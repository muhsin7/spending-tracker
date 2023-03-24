import { useState } from "react";
import AmountCard from "./AmountCard";
import BudgetCard from "./BudgetCard";

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
        <div class="dashboard-amount-cards">
            <AmountCard />
            <BudgetCard negative={true}  hasBudget={true} />
        </div>
    )
}