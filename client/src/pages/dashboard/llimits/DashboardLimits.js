import axios from "axios"
import { useEffect, useState } from "react";
import { useToken } from "../../../authentication/useToken";
import LimitCard from "./LimitCard";

export default function DashboardLimits(props) {
    const [token, setToken] = useToken(); 
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/category/withSpendingLimit', {
        headers: {
            "Authorization": "Bearer " + token
        }
        }).then((res) => {
        console.log(filterData(res.data));
        setData(res.data);
        });
    }, []);

    const filterData = (catSLdata) => {
        return catSLdata.filter((val) => val.spendingLimit !== undefined);
    } 

    // useEffect(() => {
    //     console.log(filterData(data));
    // }, [data]);

    const getPaymentsOfId = (id) => {
        let res = [];
        for(const e of props.payments) {
            if(e._id === id) res.push(e);
        }
        return res;
    }

    return (
        <>
            <h2>Spending Limits</h2>
            <div className="limit-cards">
                {
                filterData(data).map((e, index) => (
                    <LimitCard key={e._id} limit={e} payments={getPaymentsOfId(e._id)}/>
                ))
                }
            </div>  
        </>
    );

}