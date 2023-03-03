import './addCategory.css';
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import { useToken } from "../authentication/useToken";

function AddCategory() {

    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useToken();
    const [categoryValue, setCategoryValue] = useState('');
    const [spendingLimit, setSpendingLimitValue] = useState('');


    const onSubmit = async () => {
        const response = await axios.post('/api/category', {
            category: categoryValue,
            spendingLimit: spendingLimit,
        });
    
        const {token} = response.data;
        setToken(token);
        return <Navigate to = "/"/>;
    }

    return(
        <div className="div-category">
            <h2 id = "categoryTitle">Add Category</h2>
            {errorMessage && <div className="Error">{errorMessage}</div>}
            <fieldset>
            <div className='form-group'>
                <form className = 'categoryForm'onSubmit = {onSubmit}>
                    <input
                    className='inputBox' 
                    value = {categoryValue} 
                    onChange={e => setCategoryValue(e.target.value)}
                    placeholder="Name of the category:" required/>
                    <input 
                    className='inputBox'
                    value = {spendingLimit} 
                    onChange={e => setSpendingLimitValue(e.target.value)} 
                    placeholder="Spending Limit:" required/>
                    <button id = "addCategory" >Add</button>
                </form>
            </div>
            </fieldset>
        </div>
    )
}

export default AddCategory;