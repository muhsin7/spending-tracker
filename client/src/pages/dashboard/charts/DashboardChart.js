import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, Label } from 'recharts';
import { useEffect, useState } from 'react';

const dateStringFromUnixString = (unixTimeString) => new Date(Number(unixTimeString)).toDateString();

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          {/* <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div> */}
          {/* <div className="intro">-£{payload[0].value}</div> */}
          <div className="tooltip-label">{payload ? `-£${payload[0].value.toFixed(2)}` : "Error"}</div>

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

const dataValueToUnix = (value) => {
    let onlyDate = new Date(Date.parse(value.date));
    const dateString = new Date(onlyDate.getFullYear(), onlyDate.getMonth(), onlyDate.getDay()).getTime();
    return dateString;
}

const dataValueToMonth = (value) => {
    let onlyDate = new Date(Number(value.createdAt.$date.$numberLong));
    onlyDate.setUTCHours(0, 0, 0, 0);
    const dateString = onlyDate.setUTCDate(1).toString();
    return dateString;
}

function processData({payments, startDate=new Date(0), endDate=new Date()}) {
  const groups = {};
    if(payments) {
      let total = 0;
      payments.forEach((payment) => {
        const paymentDate = new Date(payment.date);
        if (paymentDate >= startDate && paymentDate <= endDate)
        {
          const date = Date.parse(new Date(payment.date).toDateString());
          // const date = new Date(payment.date).toDateString();
        if (!groups[date]) {
          groups[date] = total + payment.amount;
          total += payment.amount;
        }
        // groups[date] += payment.amount;
        }
      });
      return Object.entries(groups).map(([date, amount]) => ({
        date,
        amount,
      }));
    }
  }


export default function DashboardChart(props) {
  
    const [isCumulative, setIsCumulative] = useState(false);
    
    const [data, setData] = useState([]);

    const [dataByDate, setDataByDate] = useState(processData({payments: data}));

    const todayMonthName = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const monthIndex = today.getMonth();
        return `${months[monthIndex]}  ${today.getFullYear()}`;
    }

    const toggleCumulative = (event) => {
            event.persist();
            setIsCumulative(event.target.checked);
            if(event.target.checked) {
                setDataByDate(processData({data, startDate: props.start, endDate: props.end, cumulative: true}));
            } else {
                setDataByDate(processData({data, startDate: props.start, endDate: props.end, cumulative: false}));
            }
    } 
    
    useEffect(() =>
      {
        setData(props.payments);
        setDataByDate(processData({payments: data}));
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
                        height={40}
                        tickFormatter={unixTimeString => dateStringFromUnixString(unixTimeString)}
                        // tickFormatter={unixTime=> new Date(Number(unixTime)).getDate()}
                    >
                            <Label style={{
                            textAnchor: "middle",
                            // fontSize: "130%",
                            fill: "white",
                            }}
                            value={"(Cumulative payments since start date)"} offset={0} position="insideBottom" />
                        {/* // value={(props.start && props.end) ? `${props.start.toDateString()} to ${props.end.toDateString()}` : ""} offset={0} position="insideBottom" /> */}
                    </XAxis>
                    <Label
                        style={{
                            textAnchor: "middle",
                            fontSize: "130%",
                            fill: "white",
                        }}
                        angle={270} 
                        value={"Height (ft.)"} />
                    <YAxis stroke="#ccc" tickFormatter={amount => "£"+amount}/>
                    <Tooltip filterNull={false} content={<CustomTooltip />}/>
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
            {/* <label className="checkbox-label">
                <input type="checkbox" checked={isCumulative} onChange={toggleCumulative} />
                <span>Cumulative data</span>
            </label> */}
        </>
    );
    

    return renderLineChart;
}