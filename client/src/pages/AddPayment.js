import React, { useEffect } from "react";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import { useToken } from "../authentication/useToken";

function AddPayment() {
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
        reader.onload = function () {
            console.log(reader.result);
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        reader.readAsDataURL(file);
    }

    const handleFileRead = async (target) => {
        // const file = target.files[0];
        // let base64 = "t";
        // await getBase64(file, (val) => { base64=val });
        // console.log(base64);
        // return base64;
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => ({
            ...formValues,
            image: reader.result
        }), false);

        if (file) reader.readAsDataURL(file);
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
                await setNewCategories(res.data);
                // TODO: set an initial value for the category selected
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
                categoryId: formValues["categoryId"],
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(res => console.log(res));
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
        <div className="div-addCategory">
            {errorMessage && <div className="Error">{errorMessage}</div>}
            <section className='addCategoryForm'>
                <h2 className= "addCategoryTitle">Add Category</h2>
                <fieldset className="addCategoryFields">
                    <form onSubmit = {onSubmit}>
                        <div className='addCategoryInputBox'>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formValues["title"]}
                                placeholder="Payment name"
                                onChange={onFormChange}
                                required
                                />
                        </div>
                        <div className='addCategoryInputBox'>
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
                        <div className='addCategoryInputBox'>
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
                        <div className='addCategoryInputBox'>
                            <select
                                value={formValues["categoryId"]}
                                name="categoryId"
                                onChange={onFormChange}
                            >
                                <option key="" value=""></option>
                                {newCategories.map((option) => (
                                <option key={option._id} value={option._id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='addCategoryInputBox'>
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