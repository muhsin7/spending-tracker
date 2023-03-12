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
        <div className="div-addCategory">
            {errorMessage && <div className="Error">{errorMessage}</div>}
            <section className='addCategoryForm'>
                <h2 className= "addCategoryTitle">Add Category</h2>
                <fieldset className="addCategoryFields">
                    <form onSubmit = {onSubmit}>
                        <div className='addCategoryInputBox'>
                            <input
                                value = {categoryValue} 
                                onChange={e => setCategoryValue(e.target.value)}
                                placeholder="Name of the category:" required/>
                        </div>
                        <div className='addCategoryInputBox'>
                            <input 
                                value = {spendingLimit} 
                                onChange={e => setSpendingLimitValue(e.target.value)} 
                                placeholder="Spending Limit:" required/>
                        </div>
                        <button id = "addCategoryButton" >Add</button>
                    </form>
                </fieldset>
            </section>
          
        </div>
    )
}

export default AddCategory;