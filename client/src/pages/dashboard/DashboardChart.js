import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';

const dateStringFromUnixString = (unixTimeString) => new Date(Number(unixTimeString)).toLocaleDateString();

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div>
          <div className="intro">${payload[0].value}</div>
        </div>
      );
    }
  
    return null;
  }

const ascendingCompare = (A, B) => {
    if(A === B) {
        return 0;
    } else {
        return A < B ? -1 : 1
    }
}

const dataValueToDate = (value) => {
    let onlyDate = new Date(Number(value.createdAt.$date.$numberLong));
    const dateString = new Date(onlyDate.getFullYear(), onlyDate.getMonth());
    return dateString;
}

const dataValueToMonth = (value) => {
    let onlyDate = new Date(Number(value.createdAt.$date.$numberLong));
    onlyDate.setUTCHours(0, 0, 0, 0);
    const dateString = onlyDate.setUTCDate(1).toString();
    return dateString;
}

const processData = ({data, cumulative=false, cumulateBy=dataValueToDate}) => {
    let dataByDate = [];
    let total = 0;
    data.sort((a, b) => ascendingCompare(Number(a.createdAt.$date.$numberLong), Number(b.createdAt.$date.$numberLong)));
    data.reduce(function(res, value) {
        let dateString=cumulateBy(value);

        if (!res[dateString]) {
            res[dateString] = {
                date: dateString,
                amount: cumulative ? total : 0
            };
            dataByDate.push(res[dateString]);
        }
        res[dateString].amount += value.amount;
        total += value.amount
        return res;
    }, {});


    return dataByDate;
}


export default function DashboardChart() {
    const dummydata = [{
        "_id": {
          "$oid": "64010056df38280a58a1c1ca"
        },
        "title": "day",
        "description": "in the last day",
        "amount": 4,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677787222089"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1677787222089"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010057df38280a58a1c1cd"
        },
        "title": "day",
        "description": "in the last day",
        "amount": 102,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677787223754"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1677787223754"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010058df38280a58a1c1d0"
        },
        "title": "day",
        "description": "in the last day",
        "amount": 120,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1675368024180"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1675368024180"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010060df38280a58a1c1d3"
        },
        "title": "month",
        "description": "in the last day",
        "amount": 12980,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677700832416"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1672689632416"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010060df38280a58a1c1d6"
        },
        "title": "month",
        "description": "in the last day",
        "amount": 12,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677700832723"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1672689632723"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010061df38280a58a1c1d9"
        },
        "title": "month",
        "description": "in the last day",
        "amount": 2190,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677700833015"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1672689633015"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010061df38280a58a1c1dc"
        },
        "title": "month",
        "description": "in the last day",
        "amount": 1229,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1677700833335"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1672689633335"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010064df38280a58a1c1df"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 4,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251236680"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251236680"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010064df38280a58a1c1e2"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 4,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251236959"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251236959"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010065df38280a58a1c1e5"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 129,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251237300"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251237300"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010065df38280a58a1c1e8"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 4,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251237581"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251237581"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010065df38280a58a1c1eb"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 4211,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251237937"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251237937"
          }
        },
        "__v": 0
      },{
        "_id": {
          "$oid": "64010066df38280a58a1c1ee"
        },
        "title": "year",
        "description": "in the last day",
        "amount": 1000,
        "categoryId": {
          "$oid": "6400ffc6df38280a58a1c1c5"
        },
        "userId": {
          "$oid": "6400ff30df38280a58a1c1c2"
        },
        "createdAt": {
          "$date": {
            "$numberLong": "1646251238292"
          }
        },
        "updatedAt": {
          "$date": {
            "$numberLong": "1646251238292"
          }
        },
        "__v": 0
      }];

    const categoryData = [{
        "name": "Grocery",
        "amount": 100,
    },
    {
        "name": "Grocer2",
        "amount": 200,
    },
    {
        "name": "Grocery3",
        "amount": 100,
    },
    {
        "name": "Groc6ery",
        "amount": 140,
    },
    {
        "name": "Gro7cery",
        "amount": 190,
    },]

    const [data, setData] = useState(dummydata);

    const [isCumulative, setIsCumulative] = useState(false);

    const [dataByDate, setDataByDate] = useState(processData({data}));

    const [dataByMonth, setDataByMonth] = useState(processData({data: data, cumulative: false, dataValueToMonth}));


    const toggleCumulative = (event) => {
            event.persist();
            setIsCumulative(event.target.checked);
            if(event.target.checked) {
                setDataByDate(processData({data, cumulative: true}));
            } else {
                setDataByDate(processData({data, cumulative: false}));
            }
    } 
    

    const renderLineChart = (
        <div className="line-chart noselect dashboard-right">
            <ResponsiveContainer width="95%" height="95%">
                <LineChart data={dataByDate} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="amount" strokeWidth={2.5} stroke="#00B57F  " />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
                        dataKey="date"
                        domain={["auto", "auto"]}
                        tickFormatter={unixTimeString => dateStringFromUnixString(unixTimeString)}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
            </ResponsiveContainer>
            <label className="checkbox-label">
                <input type="checkbox" checked={isCumulative} onChange={toggleCumulative} />
                <span>Cumulative data</span>
            </label>
        </div>
    );


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    const renderPieChart = (
        <div className="line-chart noselect dashboard-right">
            <ResponsiveContainer width={900} height="90%">
            <PieChart width={730} height={400}>
                <Legend layout="vertical" verticalAlign="top" align="top" />
                <Pie
                    data={categoryData}
                    dataKey="amount"
                    nameKey="name"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>
    );

    const renderBarChart = (
        <div className="line-chart noselect dashboard-right">
            <ResponsiveContainer width={900} height="90%">
            <BarChart width={730} height={400} data={dataByMonth}>
                <Bar
                    dataKey="amount"
                    // nameKey="date"
                    // label={()}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                </Bar>
                <XAxis tickFormatter={unixTimeString => {
                    const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ];
                  return monthNames[unixTimeString];
                }} />
                <YAxis />
                <Tooltip />
            </BarChart>
            </ResponsiveContainer>
        </div>
    );
    

    return renderLineChart;
}