import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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

const processData = ({data, cumulative=false}) => {
    let dataByDate = [];
    let total = 0;
    data.sort((a, b) => ascendingCompare(Number(a.createdAt.$date.$numberLong), Number(b.createdAt.$date.$numberLong)));
    data.reduce(function(res, value) {
        // console.log(total);
        let onlyDate = new Date(Number(value.createdAt.$date.$numberLong));
        const dateString = onlyDate.setUTCHours(0, 0, 0, 0).toString();
        // const dateString = onlyDate.toLocaleDateString();

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

    const [data, setData] = useState(dummydata);

    const [isCumulative, setIsCumulative] = useState(false);

    const [dataByDate, setDataByDate] = useState(processData({data}));

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
      <>
        <div className="line-chart noselect">
            <LineChart width={600} height={300} data={dataByDate} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
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
            <label class="checkbox-label">
                <input type="checkbox" checked={isCumulative} onChange={toggleCumulative} />
                <span>Cumulative data</span>
            </label>
        </div>
      </>
    );

    return renderLineChart;
}