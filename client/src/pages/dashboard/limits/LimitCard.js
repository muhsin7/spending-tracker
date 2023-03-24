import PercentageBar from "./PercentageBar";

export default function LimitCard(props) {

    const getPaymentSumOfLimitDuration = () => {
        // console.log(props.payments);
        let res = [];
        let dt = new Date();
        switch(props.limit.spendingLimit.duration.type) {
            case "YEAR":
                dt = new Date(dt.getFullYear(), 0, 1);
                break;
            case "MONTH":
                dt = new Date(dt.getFullYear(), dt.getMonth(), 1);
                break;
            case "DAY":
                dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0);
                break;
            case "WEEK":
                const tempDay = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0);
                const day = tempDay.getDay();
                dt = new Date(tempDay.setDate(dt.getDate() - day + (day === 0 ? -6:1)));
                break;
            default:
                dt = new Date(0);
                // res = props.payments;
                break;
        }
        // console.log(`LIMIT TYPE ${props.limit.spendingLimit.duration.type}, GENERATED MIN DATE ${dt}`)

        if(dt.getTime() === 0) {
            res = props.payments;
        } else {
            const today = new Date().getTime();
            props.payments.forEach(pay => {
                // console.log(pay)
                const paytime = Date.parse(pay.date);
                if(paytime <= today && paytime >= dt.getTime()) {
                    // console.log("added");
                    res.push(pay);
                }
            });
            // console.log(res.length);
        }
        if(res) {
            return res.reduce((a, b) => a + (b.amount || 0), 0);
        }
        else {
            return 0;
        }
    }
    
    const completedAmount = () => {
        return ((getPaymentSumOfLimitDuration()/props.limit.spendingLimit.amount)*100).toFixed(1)
    }

    return (
        <div className="dashboard-container dashboard-limit-card">
            <div className="limit-card-title">
                {props.limit.name}
            </div>
            <div className="limit-card-subtitle">
                {`Spent £${getPaymentSumOfLimitDuration().toFixed(2)} of £${props.limit.spendingLimit.amount} limit this ${props.limit.spendingLimit.duration.type.toLowerCase()}`}  {}
            </div>
            <PercentageBar completed={completedAmount()}/>
        </div>
    );
}