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
import axios from "axios";
import { useToken } from "../../../authentication/useToken";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        {/* <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div> */}
        {/* <div className="intro">-£{payload[0].value}</div> */}
        <div className="tooltip-label">
          {payload ? `-£${payload[0].value.toFixed(2)}` : "Error"}
        </div>
      </div>
    );
  }

  return null;
}

const dataValueToMonth = (value) => {
  let onlyDate = new Date(Date.parse(value.date));
  onlyDate.setUTCHours(0, 0, 0, 0);
  const dateString = onlyDate.setUTCDate(1).toString();
  return dateString;
};

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
  const [token, setToken] = useToken();
  const [dataByMonth, setDataByMonth] = useState([]);

  const isSameMonthAsToday = (dateToCheck) => {
    const today = new Date();
    return (
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear()
    );
  };

  useEffect(() => {
    setDataByMonth(
      processData({
        payments: props.payments,
        startDate: props.start,
        endDate: props.end,
      })
    );
  }, [props.end, props.payments, props.start]);

  const renderBarChart = (
    <ResponsiveContainer>
      <BarChart width={730} height={400} data={dataByMonth}>
        <Bar
          dataKey="amount"
          // nameKey="date"
          // label={()}
        >
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
  );

  return renderBarChart;
}
