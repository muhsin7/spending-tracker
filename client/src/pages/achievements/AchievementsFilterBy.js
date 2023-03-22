import { useState } from "react";
import DatePicker from "react-datepicker";

export default function AchievementsFilterBy(props) {
  const [filterBy, setFilterBy] = useState("");
  const [filterByInputCode, setFilterByInputCode] = useState([]);
  const [date, setDate] = useState(null);
  const FILTER_BY_OPTIONS = [
    "",
    "Category",
    "Title",
    "Description",
    "Price",
    "Date",
  ];

  function confirmFilterBy(e) {
    setFilterBy(e.target.value);

    switch (e.target.value) {
      case "":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([]);
        break;

      case "Category":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="Category"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((payment) =>
                  props.categories
                    .find((category) => category._id === payment.categoryId)
                    .name.toLowerCase()
                    .includes(e.target.value)
                )
              );
            }}
          />,
        ]);
        break;

      case "Title":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="Title"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((payment) =>
                  payment.title.toLowerCase().includes(e.target.value)
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
                props.defaultAchievements.filter((payment) =>
                  payment.description.toLowerCase().includes(e.target.value)
                )
              );
            }}
          />,
        ]);
        break;

      case "Price":
        props.setAchievements(props.defaultAchievements);
        setDate(null);
        setFilterByInputCode([
          <input
            className="achievements-filter-by-input"
            key="Price"
            onChange={(e) => {
              props.setAchievements(
                props.defaultAchievements.filter((payment) =>
                  ("-£" + payment.amount.toString()).includes(e.target.value)
                )
              );
            }}
          />,
        ]);
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
        {filterBy !== "Date" ? (
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
                props.defaultAchievements.filter((payment) =>
                  isSameDate(new Date(Date.parse(payment.date)), date)
                )
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
