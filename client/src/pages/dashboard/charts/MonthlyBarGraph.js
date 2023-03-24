import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

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
  const groupedPayments = {};
  payments.forEach((payment) => {
    const paymentDate = new Date(payment.date);
    if (paymentDate >= startDate && paymentDate <= endDate) {
      const month = paymentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (groupedPayments[month]) {
        groupedPayments[month].amount += payment.amount;
      } else {
        groupedPayments[month] = {
          date: month,
          amount: payment.amount,
        };
      }
    }
  });
  return Object.values(groupedPayments);
}

export default function MonthlyBarGraph(props) {
  const [dataByMonth, setDataByMonth] = useState([]);

  useEffect(() => {
    console.log(dataByMonth);
  }, [dataByMonth]);

  useEffect(() => {
    setDataByMonth(
      processData({
        payments: props.payments,
        startDate: props.start,
        endDate: props.end,
      })
    );
  }, [props.end, props.payments, props.start]);

  const renderBarChart =
    dataByMonth.length > 0 ? (
      <ResponsiveContainer>
        <BarChart width={730} height={400} data={dataByMonth}>
          <Bar dataKey="amount">
            {dataByMonth.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#00B57F" />
            ))}
          </Bar>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.0)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <div className="empty-container">No data to display line chart</div>
    );

  return renderBarChart;
}
