// import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

// const dateStringFromUnixString = (unixTimeString) => new Date(Number(unixTimeString)).toLocaleDateString();


// function CustomTooltip({ payload, label, active }) {
//     if (active) {
//       return (
//         <div className="custom-tooltip">
//           <div className="tooltip-label">{`${dateStringFromUnixString(label)}`}</div>
//           <div className="intro">${payload[0].value}</div>
//         </div>
//       );
//     }
  
//     return null;
//   }

// export default function SpendingLineChart(props) {
// const dataByDate = props.data;

//     return  (
//         <div className="line-chart noselect">
//             <LineChart data={dataByDate} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
//                 <Line type="monotone" dataKey="amount" strokeWidth={2.5} stroke="#00B57F  " />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <XAxis
//                     dataKey="date"
//                     domain={["auto", "auto"]}
//                     tickFormatter={unixTimeString => dateStringFromUnixString(unixTimeString)}
//                 />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />}/>
//             </LineChart>
//         <label className="checkbox-label">
//             <input type="checkbox" checked={isCumulative} onChange={toggleCumulative} />
//             <span>Cumulative data</span>
//         </label>
//     </div>
//     );

// }