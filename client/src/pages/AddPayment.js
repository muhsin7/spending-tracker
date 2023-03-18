import React, { useEffect } from "react";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import { useToken } from "../authentication/useToken";

function AddPayment() {
    const navigate = useNavigate();
    const [newCategories, setNewCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useToken();
    const [formValues, setFormValues] = useState(
        {
            "title": "",
            "description": "",
            "amount": 0,
            "image": "",
            "categoryId": "",
        }
    )

    useEffect(() => console.log(token), [token]);

    function getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const handleFileRead = async (target) => {
        const file = target.files[0];
        let base64 = await getBase64(file);
        console.log(base64);
        return base64;
    }

    const onFormChange = async (event) => {
        event.preventDefault();
        const target = event.target;
        const value = target.type === "file" ? await handleFileRead(target) : target.value;
        const name = target.name;

        setFormValues({
            ...formValues,
            [name]: value
        });
        console.log(formValues);
    }

      // Gets all the user's categories from the database
        useEffect(() => {
            axios.get('/api/category', {
            headers: {
                "Authorization": "Bearer " + token
            }
            }).then(async (res) => {
                setNewCategories(res.data);
            });
        }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/payment', {
                title: formValues["title"],
                description: formValues["description"],
                amount: formValues["amount"],
                image: formValues["image"],
                categoryId: formValues["categoryId"]
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            console.log(response);
            if (response.status === 201) navigate("/payments");
            
        } catch (err) {
            if(err.response.data.message) setErrorMessage(err.response.data.message);
            else if(err.response.data.error) setErrorMessage(err.response.data.error);
        }
    }

    return(
        <div className="div-inputForm">
            <section className='inputForm'>
                <h2 className= "inputFormTitle">Add Payment</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <fieldset className="inputFormFields">
                    <form onSubmit = {onSubmit}>
                        <div className='inputFormInputBox'>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="title"
                                value={formValues["name"]}
                                placeholder="Payment name"
                                onChange={onFormChange}
                                required
                                />
                        </div>
                        <div className='inputFormInputBox'>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={formValues["description"]}
                                placeholder="Payment description"
                                onChange={onFormChange}
                            />
                        </div>
                        <div className='inputFormInputBox'>
                            {/* <label for="amount">Amount</label> */}
                            <input
                                type="number"
                                className="form-control"
                                id="amount"
                                name="amount"
                                value={formValues["amount"]}
                                placeholder="Amount"
                                onChange={onFormChange}
                            />
                        </div>
                        <div className='inputFormInputBox'>
                            <select
                                value={formValues["categoryId"]}
                                name="categoryId"
                                onChange={onFormChange}
                            >   <option key="" value=""></option>
                                {newCategories.map((option) => (
                                <option key={option._id} value={option._id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='inputFormInputBox'>
                            <input
                                type="file"
                                alt="Receipt image"
                                accept="image/png, image/jpeg"
                                // className="form-control"
                                // id="image"
                                name="image"
                                // // value={formValues["image"]}
                                // label="Payment image"
                                onChange={onFormChange}
                            />
                        </div>
                        <input onClick={onSubmit} type="button" className="btn btn-header" value="Add payment" />
                    </form>
                </fieldset>
            </section>
          
        </div>
    )
}

export default AddPayment;