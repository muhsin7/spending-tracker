import { useEffect, useState } from "react";

export default function AmountCard(props) {
  const durations = ["day", "week", "month", "year"];

  const [dropdownDuration, setDropdownDuration] = useState(durations[0]);

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (props.summary) {
      setAmount(props.summary[dropdownDuration]);
    }
  }, [dropdownDuration, props.summary]);

  const durationElements = [];

  durations.forEach((length) => {
    durationElements.push(
      <option value={length}>{length === "day" ? "today" : length}</option>
    );
  });

  function setOption(event) {
    setDropdownDuration(event.target.value);
  }

  return (
    <div className="dashboard-money dashboard-container">
      <div className="dashboard-amount">£{amount ? amount.toFixed(2) : 0}</div>
      <div className="dashboard-amount-description">
        <form>
          <label for="duration">
            spent {dropdownDuration === "day" ? "" : "this"}{" "}
          </label>
          <select
            onChange={setOption}
            id="amount-duraton"
            name="duration"
            className="duration-selector"
          >
            {durationElements}
          </select>
        </form>
      </div>
    </div>
  );
}
