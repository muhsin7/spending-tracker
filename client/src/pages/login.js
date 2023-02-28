import React from "react";
import './login.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import { useToken } from "../authentication/useToken";

function Login() {

        const [token, setToken] = useToken();
        const [errorMessage, setErrorMessage] = useState('')
        const [goToRegister, setGoToRegister] = React.useState(false);
        const [emailValue, setEmailValue] = useState('');
        const [passwordValue, setPasswordValue] = useState('');
        const navigate = useNavigate();


        if(goToRegister){
            return<Navigate to="/register"/>;
        }

        const onLoginClicked = async () => {
            const response = await axios.post('/api/user/login', {
                email: emailValue,
                password: passwordValue,
            });

            const {token} = response.data;
            setToken(token);

            navigate('/user');
            // return <Navigate to = "/user"/>;
        }

        return(
            <div className="div-login">
                <h2>Login</h2>
                {errorMessage && <div className="Error">{errorMessage}</div>}
                <div>
                    <form>
                        <input value = {emailValue} 
                        onChange={e => setEmailValue(e.target.value)}
                        type='email' 
                        name='email' 
                        placeholder="Email:" required/>
                        <input 
                        value = {passwordValue} 
                        onChange={e => setPasswordValue(e.target.value)}
                        type='password' 
                        name='password' 
                        placeholder="Password:" required/>
                        <button id="forgotPassword">Forgot your password?</button>
                        <button 
                        onClick={onLoginClicked}
                        type="button" id="logInButton" >Log In</button>

                        <button onClick={() => {
                            setGoToRegister(true);
                        }}
                            id = "registerButton" >Don't have an account? Register here!</button>
                    </form>
                </div>
            </div>
        )
}

export default Login;