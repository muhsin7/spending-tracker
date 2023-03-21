import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';

const dateStringFromUnixString = (unixTimeString) => new Date(Number(unixTimeString)).toLocaleDateString();

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          {/* <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div> */}
          {/* <div className="intro">-£{payload[0].value}</div> */}
          <div className="tooltip-label">{payload ? `-£${payload[0].value}` : "Error"}</div>

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
    let onlyDate = new Date(Date.parse(value.date));
    const dateString = new Date(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDay());
    return dateString;
}

const dataValueToMonth = (value) => {
    let onlyDate = new Date(Number(value.createdAt.$date.$numberLong));
    onlyDate.setUTCHours(0, 0, 0, 0);
    const dateString = onlyDate.setUTCDate(1).toString();
    return dateString;
}

const processData = ({data, cumulative=false, cumulateBy=dataValueToDate}) => {
    let dataByDateInternal = [];
    let total = 0;
    if(data !== undefined) {
      data.sort((a, b) => ascendingCompare(new Date(Date.parse(a.date)), new Date(Date.parse(b.date))));
      data.reduce(function(res, value) {
        let dateString=cumulateBy(value);

        if (!res[dateString]) {
            res[dateString] = {
                date: dateString,
                amount: cumulative ? total : 0
            };
            dataByDateInternal.push(res[dateString]);
        }
        res[dateString].amount += value.amount;
        total += value.amount
        return res;
    }, {});
    }


    return dataByDateInternal;
}


export default function DashboardChart(props) {
  
    const [isCumulative, setIsCumulative] = useState(false);
    
    const [data, setData] = useState([]);

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
    
    useEffect(() =>
      {
        setData(props.payments);
        setDataByDate(processData({data}));
        setDataByMonth(processData({data: data, cumulative: false, dataValueToMonth}));
      }, [props.payments]);


    const renderLineChart = (
        <>
            <ResponsiveContainer>
                <LineChart data={dataByDate} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="amount" strokeWidth={2.5} stroke="#00B57F  " />
                    {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                    <CartesianGrid stroke='none' />
                    <XAxis
                        stroke="#ccc"
                        dataKey="date"
                        domain={["auto", "auto"]}
                        tickFormatter={unixTimeString => dateStringFromUnixString(unixTimeString)}
                    />
                    <YAxis stroke="#ccc" tickFormatter={amount => "£"+amount}/>
                    <Tooltip filterNull={false} content={<CustomTooltip />}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            <label className="checkbox-label">
                <input type="checkbox" checked={isCumulative} onChange={toggleCumulative} />
                <span>Cumulative data</span>
            </label>
        </>
    );


    // const renderBarChart = (
    //     <div className="line-chart noselect dashboard-right">
    //         <ResponsiveContainer width={900} height="90%">
    //         <BarChart width={730} height={400} data={dataByMonth}>
    //             <Bar
    //                 dataKey="amount"
    //                 // nameKey="date"
    //                 // label={()}
    //                 >
    //                     {data.map((entry, index) => (
    //                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                     ))}
    //             </Bar>
    //             <XAxis tickFormatter={unixTimeString => {
    //                 const monthNames = ["January", "February", "March", "April", "May", "June",
    //                 "July", "August", "September", "October", "November", "December"
    //               ];
    //               return monthNames[unixTimeString];
    //             }} />
    //             <YAxis />
    //             <Tooltip />
    //         </BarChart>
    //         </ResponsiveContainer>
    //     </div>
    // );
    

    return renderLineChart;
}