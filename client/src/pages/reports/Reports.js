import axios from "axios";
import { array } from "prop-types";
import { useEffect, useState } from "react";
import { useToken } from "../../authentication/useToken";
import CategoryPieChart from "../dashboard/charts/CategoryPieChart";
import DashboardChart from "../dashboard/charts/DashboardChart";
import MonthlyBarGraph from "../dashboard/charts/MonthlyBarGraph";

export default function Reports() {
  const [token, setToken] = useToken();

  const [start, setStart] = useState(new Date(0));
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


  const [biggestPayment, setBiggestPayment] = useState({});
  useEffect(() => {
    if(data.length > 0) {
      const biggest = data.reduce((prev, curr) => {
        return prev.amount > curr.amount ? prev : curr;
      });
      setBiggestPayment(biggest);
    }
  }, [data])

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

  const [categoryStat, setCategoryStat] = useState({});
  // const getBiggestCategory = (payments) =>  {
  //   if(payments)
  // }
  useEffect(() => {
    axios
      .get("/api/category", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((categoryMetaData) => {
        let res = [];
        const catData = categoryMetaData.data;
        catData.forEach((cat) => {
          let sum = 0;
          data.forEach((pay) => {
            const paymentDate = new Date(pay.date);
            if (paymentDate >= start && paymentDate <= end) {
              if (pay.categoryId === cat._id) {
                sum += pay.amount;
              }
            }
          });

          // Excludes empty categories
          if (sum !== 0) {
            res.push({
              name: cat.name,
              amount: sum,
            });
          }
        });

        if(res) {
          const maxCat = res.reduce((prev, curr) => {
            return prev.amount > curr.amount ? prev : curr;
          });
          setCategoryStat(maxCat);
        }
      });
  }, [data, start, end]);

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
      {selectedClass("custom") ? (
        <div className="date-picker-container">
          <h3>Select custom duration</h3>
          <div className="report-date-pickers">
            <div>
            <span>Start date</span>
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
            {categoryStat ? (
              <>
                <div className="stat-title">
                  You spent the most on <b>{categoryStat.name}</b>
                </div>
                <div className="stat-amount">£{categoryStat.amount}</div>
              </>
            ) : (
              <div className="stat-title">
                Not enough data to determine the most spent category
              </div>
            )}
          </div>
          <div className="report-stat-card stat-medium">
          {biggestPayment ? (
              <>
                <div className="stat-title">
                Your biggest purcase was on <b>{new Date(Date.parse(biggestPayment.date)).toLocaleDateString()}</b> on <b>{biggestPayment.title}</b>
                </div>
                <div className="stat-amount">£{biggestPayment.amount}</div>
              </>
            ) : (
              <div className="stat-title">
                Not enough data to determine the most spent category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
