import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useEffect, useState } from "react";

const dateStringFromUnixString = (unixTimeString) =>
  new Date(Number(unixTimeString)).toDateString();

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <div className="tooltip-label">
          {payload ? `-£${payload[0].value.toFixed(2)}` : "Error"}
        </div>
      </div>
    );
  }

  return null;
}

function processData({
  payments,
  startDate = new Date(0),
  endDate = new Date(),
}) {
  const groups = {};
  if (payments) {
    let total = 0;
    payments.forEach((payment) => {
      const paymentDate = new Date(payment.date);
      if (paymentDate >= startDate && paymentDate <= endDate) {
        const date = Date.parse(new Date(payment.date).toDateString());
        if (!groups[date]) {
          groups[date] = total + payment.amount;
          total += payment.amount;
        }
      }
    });
    return Object.entries(groups).map(([date, amount]) => ({
      date,
      amount,
    }));
  }
}

export default function DashboardChart(props) {
  const [data, setData] = useState([]);
  const [dataByDate, setDataByDate] = useState(processData({ payments: data }));

  useEffect(() => {
    setData(props.payments);
    const newData = processData({
      payments: props.payments,
      startDate: props.start,
      endDate: props.end,
    });
    console.log(newData);
    setDataByDate(newData);
  }, [props.payments, props.start, props.end]);

  const renderLineChart = (
    <>
      {dataByDate.length > 0 ? (
        <ResponsiveContainer>
          <LineChart
            data={dataByDate}
            margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey="amount"
              strokeWidth={2.5}
              stroke="#00B57F  "
            />
            <CartesianGrid stroke="none" />
            <XAxis
              stroke="#ccc"
              dataKey="date"
              domain={["auto", "auto"]}
              height={40}
              tickFormatter={(unixTimeString) =>
                dateStringFromUnixString(unixTimeString)
              }
            >
              <Label
                style={{
                  textAnchor: "middle",
                  fill: "white",
                }}
                value={"(Cumulative payments since start date)"}
                offset={0}
                position="insideBottom"
              />
            </XAxis>
            <Label
              style={{
                textAnchor: "middle",
                fontSize: "130%",
                fill: "white",
              }}
              angle={270}
              value={"Height (ft.)"}
            />
            <YAxis stroke="#ccc" tickFormatter={(amount) => "£" + amount} />
            <Tooltip filterNull={false} content={<CustomTooltip />} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="empty-container">No data to display line chart</div>
      )}
    </>
  );

  return renderLineChart;
}
