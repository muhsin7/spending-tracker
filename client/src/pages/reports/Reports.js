import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useToken } from "../../authentication/useToken";
import CategoryPieChart from "../dashboard/charts/CategoryPieChart";
import DashboardChart from "../dashboard/charts/DashboardChart";
import MonthlyBarGraph from "../dashboard/charts/MonthlyBarGraph";

export default function Reports() {
  const [token, setToken] = useToken();

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [duration, setDuration] = useState("");

  const [data, setData] = useState([]);

  const durations = ["month", "year", "day", "week", "custom", "all"];
  const buttonContents = {
    month: "This month",
    year: "This year",
    day: "Today",
    week: "This week",
    custom: "Custom",
    all: "All time",
  };

  useEffect(() => {
    axios
      .get("/api/payment", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      });
  }, []);

  const onDurationSelect = (dur) => {
    setDuration(dur);
    const dt = new Date();
    switch (dur) {
      case "month":
        setStart(new Date(dt.getFullYear(), dt.getMonth(), 1));
        break;
      case "year":
        setStart(new Date(dt.getFullYear(), 0, 1));
        break;
      case "day":
        setStart(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0));
        break;
      case "week":
        const tempDay = new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate(),
          0
        );
        const day = tempDay.getDay();
        setStart(
          new Date(tempDay.setDate(dt.getDate() - day + (day === 0 ? -6 : 1)))
        );
        break;
      case "custom":
        break;
      case "all":
        setStart(new Date(0));
        break;
      default:
        // Reset duration for invalid cases
        setDuration("");
    }
  };

  const selectedClass = (dur) => {
    const isSelected = duration === dur;
    return isSelected ? "report-btn-selected" : "";
  };

  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <h3>Select the duration for which you want to view reports</h3>
      <div className="reports-buttons">
        {durations.map((val, index) => (
          <div
            className={`btn report-btn ${selectedClass(val)}`}
            onClick={() => onDurationSelect(val)}
          >
            {buttonContents[val]}
          </div>
        ))}
      </div>
      {
      selectedClass("custom") ? (
        <div className="date-picker-container">
          <h3>Select custom duration</h3>
          <div className="report-date-pickers">
            <div>
              <span>End date</span>
              <div className="inputFormInputBox report-date">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  selected={end}
                  placeholder="Date"
                  onChange={(date) => setEnd(date)}
                />
              </div>
              <div className="inputFormInputBox report-date">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  selected={start}
                  placeholder="Date"
                  onChange={(date) => setStart(date)}
                />
              </div>
              </div>   
              </div>  
              </div>       
      ) : (
        []
      )}

      <div className="report-charts">
        <div className="report-pie-chart">
          <CategoryPieChart payments={data} />
        </div>
        <div className="report-bar-chart">
          <MonthlyBarGraph payments={data} />
        </div>
        <div className="report-line-chart">
          <DashboardChart payments={data} />
        </div>
        <div className="report-stats">
            <div className="report-stat-card stat-small">
                <div className="stat-title">You spent the most on <b>Food</b></div>
                <div className="stat-amount">£200</div>
            </div>
            <div className="report-stat-card stat-medium">
                <div className="stat-title">Your biggest purcase was on <b>12th Jan 2023</b> on <b>Tesco</b></div>
                <div className="stat-amount">£3.40</div>
            </div>
        </div>
      </div>
    </div>
  );
}
