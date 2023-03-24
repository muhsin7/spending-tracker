import { useState } from "react";
import DatePicker from "react-datepicker";

export default function AchievementsFilterBy(props) {
  const [filterBy, setFilterBy] = useState("");
  const [filterByInputCode, setFilterByInputCode] = useState([]);
  const [date, setDate] = useState(null);
  const FILTER_BY_OPTIONS = [
    "",
    "Name",
    "EXP",
    "Description",
    "Locked",
    "Unlocked",
    "Unlocked date",
  ];

  function confirmFilterBy(e) {
    setFilterBy(e.target.value);

    switch (e.target.value) {
      case "":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([]);
        break;

      case "Name":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="Name"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((achievement) =>
                  achievement.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />,
        ]);
        break;

      case "EXP":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="EXP"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((achievement) =>
                  (achievement.exp.toString() + " EXP")
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />,
        ]);
        break;

      case "Description":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="Description"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((achievement) =>
                  achievement.description
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />,
        ]);
        break;

      case "Locked":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([]);
        props.setAchievements(
          props.defaultAchievements.filter((achievement) => !achievement.owned)
        );
        break;

      case "Unlocked":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([]);
        props.setAchievements(
          props.defaultAchievements.filter((achievement) => achievement.owned)
        );
        break;

      default:
        // Default will occur when the date option is selected
        props.setAchievements(props.defaultAchievements);
        break;
    }
  }

  return (
    <div className="achievements-filter-by-section">
      <span className="achievements-filter-by-text">Filter by:</span>
      <select
        className="achievements-filter-by"
        value={filterBy}
        onChange={(e) => confirmFilterBy(e)}
      >
        {FILTER_BY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div>
        {filterBy !== "Unlocked date" ? (
          filterByInputCode
        ) : (
          <DatePicker
            className="achievements-filter-by-input"
            dateFormat="dd/MM/yyyy"
            key="Date"
            selected={date}
            onChange={(date) => {
              setDate(date);

              function isSameDate(date1, date2) {
                return (
                  date1.getDate() === date2.getDate() &&
                  date1.getMonth() === date2.getMonth() &&
                  date1.getFullYear() === date2.getFullYear()
                );
              }

              props.setAchievements(
                props.defaultAchievements.filter((achievement) =>
                  isSameDate(new Date(Date.parse(achievement.date)), date)
                )
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
