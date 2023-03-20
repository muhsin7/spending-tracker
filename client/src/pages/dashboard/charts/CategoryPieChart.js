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
import axios from "axios";
import { useToken } from "../../../authentication/useToken";

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
    // const categoryData = [
    //   {
    //     name: "Grocery",
    //     amount: 100,
    //   },
    //   {
    //     name: "Grocer2",
    //     amount: 200,
    //   },
    //   {
    //     name: "Grocery3",
    //     amount: 100,
    //   },
    //   {
    //     name: "Groc6ery",
    //     amount: 140,
    //   },
    //   {
    //     name: "Gro7cery",
    //     amount: 190,
    //   },
    // ];
    const [token, setToken] = useToken(); 
    const [categoryData, setCategoryData] = useState([]);

    const countStats = (categoryMetaData) => {
      let res = [];
      categoryMetaData.forEach(cat => {
        // console.log(cat);
        let sum = 0;
        props.payments.forEach(pay => {
          // console.log(`${pay.categoryId} === ${cat._id}`)
          if(pay.categoryId === cat._id) {
            
            sum += pay.amount;
          }
        });
        // let name = cat.name;
        // res[name] = sum;
        res.push({
          name: cat.name,
          amount: sum
        })
      });
      return res;
    }

    useEffect(() => {
      axios.get('/api/category', {
      headers: {
          "Authorization": "Bearer " + token
      }
      }).then((res) => {
        const processedData = countStats(res.data);
        // console.log(processedData);
        // processedData.map((val, index) => console.log(val));
        setCategoryData(processedData);
      });
  }, [props.payments]);



  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  // const COLORS = ["#f0e004", "#00C49F", "#FFBB28", "#FF8042", "#ccc"];
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
          {categoryData ? categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          )) : []}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  return renderPieChart;
}
