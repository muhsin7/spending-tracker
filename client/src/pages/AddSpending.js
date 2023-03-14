import {useState} from "react"
import "../styles/addSpending.css"
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [formData, setFormData] = useState({
        paymentName: '',
        paymentDesc: '',
        amount: '',
      })

    const { paymentName, paymentDesc, amount } = formData
    const navigate = useNavigate();

    const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
    }

    return (
        <main className="addSpendingPage">
            <section className='spending-form'>
            <h1 className="spending-header">Add new spending</h1>      
                <form>
                <div className='spending-input-field'>
                    <input
                    type='text'
                    className='form-control'
                    id='paymentName'
                    name='paymentName'
                    value={paymentName}
                    placeholder='Payment Name'
                    onChange={onChange}
                    required
                    />
                </div>
                <div className='spending-input-field'>
                    <input
                    type='text'
                    className='form-control'
                    id='paymentDesc'
                    name='paymentDesc'
                    value={paymentDesc}
                    placeholder='Payment Description'
                    onChange={onChange}
                    />
                </div>
                <div className='spending-input-field'>
                    <input
                    type='text'
                    className='form-control'
                    id='amount'
                    name='amount'
                    value={amount}
                    placeholder='Enter amount'
                    onChange={onChange}
                    required
                    />
                </div>
                </form>

                <div>
                <button onclick="showCategories()" class="spending-dropbtn">Categories</button>
                <div id="dropdownCategories">
                </div>
                </div>

                <form>
                <label for="fileUpload" className="spending-inputfileheader">Upload receipt [optional]: </label>
                <input type="file" id="fileUpload" className="spending-inputbtn" />
                </form>

                <div className="spending-btn-container">
                <button type="button" id="cancelAddSpendingButton" className="spending-cancelbtn">Cancel</button>
                <button type="button" id="finishAddSpendingButton" className="spending-completebtn">Done</button>
                </div>
            </section>
        </main>
    )
}
