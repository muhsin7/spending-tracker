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
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('/api/category', {
                name: categoryValue,
                // spendingLimit: spendingLimit,
            }, {
                headers: {
                  "Authorization": "Bearer " + token
                }
            });
            navigate("/categories");   
            await console.log(response);  
            
        } catch (err) {
            if(err.response) {
                console.log(err.response);
            } else if (err.message) {
                console.log(err.message);
            } else {
                console.log(err);
            }
        }   
    
    }

    return(
        <div className="div-inputForm">
            {errorMessage && <div className="Error">{errorMessage}</div>}
            <section className='inputForm'>
                <h2 className= "inputFormTitle">Add Category</h2>
                <fieldset className="inputFormFields">
                    <form>
                        <div className='inputFormInputBox'>
                            <input
                                value = {categoryValue} 
                                onChange={e => setCategoryValue(e.target.value)}
                                placeholder="Name of the category:" required/>
                        </div>
                        <div className='inputFormInputBox'>
                            <input 
                                value = {spendingLimit} 
                                onChange={e => setSpendingLimitValue(e.target.value)} 
                                placeholder="Spending Limit:" required/>
                        </div>
                        <button className = "inputFormButton" onClick={onSubmit}>Add</button>
                    </form>
                </fieldset>
            </section>
          
        </div>
    )
}

export default AddCategory;