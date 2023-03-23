import { useState } from "react";

export default function Reports() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [duration, setDuration] = useState("");
    const durations = ["month", "year", "day", "week", "custom", "all"];
    const buttonContents = {
        "month": "This month",
        "year": "This year",
        "day": "Today",
        "week": "This week",
        "custom": "Custom",
        "all": "All time",
    }

    
    const onDurationSelect = (dur) => {
        setDuration(dur);
        switch(dur) {
            case "month":
                break;
            case "year":
                break;
            case "day":
                break;
            case "week":
                break;
            case "custom":
                break;
            case "all":
                setStart(new Date(0));
                break;
            default:
                // Reset duration for invalid cases
                setDuration("");
            }
            
    }

    const selectedClass = (dur) => {
        const isSelected = duration === dur;
        return isSelected ? "report-btn-selected" : ""
    }

    
    return (
        <div className="reports-page">
            <h1>Reports</h1>
            <div className="reports-buttons">
                {
                    durations.map((val, index) => (
                        <div className={`btn report-btn ${selectedClass(val)}`} onClick={() => onDurationSelect(val)}>{buttonContents[val]}</div>
                    ))
                }
                {/* <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("month")}>Last month</div>
                <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("day")}>Last day</div>
                <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("year")}>Last week</div>
                <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("year")}>Last year</div>
                <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("custom")}>Custom duration</div>
                <div className={`btn report-btn ${selectedClass()}`} onClick={() => onDurationSelect("all")}>All time</div> */}
            </div>

            <div>Start: {start.toLocaleDateString()}</div>
            <div>end: {end.toLocaleDateString()}</div>
            
        </div>
    );
}