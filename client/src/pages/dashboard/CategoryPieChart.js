import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        {/* <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div> */}
        {/* <div className="intro">-£{payload[0].value}</div> */}
        <div className="tooltip-label">
          {payload ? `-£${payload[0].value}` : "Error"}
        </div>
      </div>
    );
  }

  return null;
}

export default function CategoryPieChart(props) {
  const categoryData = [
    {
      name: "Grocery",
      amount: 100,
    },
    {
      name: "Grocer2",
      amount: 200,
    },
    {
      name: "Grocery3",
      amount: 100,
    },
    {
      name: "Groc6ery",
      amount: 140,
    },
    {
      name: "Gro7cery",
      amount: 190,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderPieChart = (
    <ResponsiveContainer>
      <PieChart>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
          fill="#8884d8"
          dataKey="amount"
          innerRadius={60}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  return renderPieChart;
}
