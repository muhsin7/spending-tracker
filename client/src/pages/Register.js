import {useState} from "react"
import { Link } from 'react-router-dom';
import "./register.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useToken } from "../Authentication/useToken";


export default function Register() {
    const [token, setToken] = useToken();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
      })

    const { name, email, password, password2 } = formData
    const navigate = useNavigate();

  //   const onLoginClicked = async () => {
  //     const response = await axios.post('/api/user/login', {
  //         email: emailValue,
  //         password: passwordValue,
  //     });

  //     const {token} = response.data;
  //     setToken(token);

  //     navigate('/user');
  // }

    const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
    }

    const onSubmit = async (e) => {
    e.preventDefault()

        if (password !== password2) {
            window.alert('Passwords do not match')
        } else {
          const response = await axios.post('/api/user', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
  
          const {token} = response.data;
          setToken(token);
    
          navigate('/user');
        }
    }


    return (
      <main className="registerPage">
        <section className='form'>
          <h1>Create an account</h1>
          
          <fieldset>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={email}
                  placeholder='Enter your email'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control'
                  id='password2'
                  name='password2'
                  value={password2}
                  placeholder='Confirm password'
                  onChange={onChange}
                  required
                />
              </div>
                <button type='submit' className='btn'>
                  Create Account
                </button>
                Already have an account? <Link to="/login">Log in</Link>
            </form>
        </fieldset>
      </section>
    </main>
  )
}
