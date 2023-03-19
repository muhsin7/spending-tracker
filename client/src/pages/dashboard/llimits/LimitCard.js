import PercentageBar from "./PercentageBar";

export default function LimitCard(props) {

    const getPaymentSumOfLimitDuration = () => {
        console.log(props.payments);
        let res = []
        switch(props.limit.spendingLimit.duration.type) {
            // case "YEAR":
            //     break;
            // case "MONTH":
            //     break;
            // case "DAY":
            //     break;
            // case "WEEK":
            //     break;
            default:
                res = props.payments;
                break;
        }
        if(res) return res.reduce((a, b) => a + (b.amount || 0), 0);
        else return 213802;
    }

    return (
        <div className="dashboard-container dashboard-limit-card">
            <div className="limit-card-title">
                {props.limit.name}
            </div>
            <div className="limit-card-subtitle">
                {`Spent ${getPaymentSumOfLimitDuration()} of £${props.limit.spendingLimit.amount} limit this ${props.limit.spendingLimit.duration.type.toLowerCase()}`}  {}
            </div>
            <PercentageBar completed={80}/>
        </div>
    );
}