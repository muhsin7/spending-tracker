import React from "react";
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


    const handleValidation = () => {
        let formIsValid = true;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(regex.test(this.state.email) === false){
            formIsValid = false;
            setErrorMessage("Please enter a valid email.");
        }
        return formIsValid;
    };


    const onLoginClicked = async (e) => {
        e.preventDefault();
        if (handleValidation) {
            const response = await axios.post('/api/user/login', {
                email: emailValue,
                password: passwordValue,
            });
    
            const {token} = response.data;
            setToken(token);
    
            navigate('/dashboard');
        }
    }

    return(
        <div className="div-login">
            <h2 className="loginTitle">Login</h2>
            {errorMessage && <div className="loginErrorMessage">{errorMessage}</div>}
            <div>
                <form>
                    <input 
                        className="inputBoxLogin"
                        value = {emailValue}
                        onChange={e => setEmailValue(e.target.value)}
                        type='email' 
                        name='email' 
                        placeholder="Email:" required/>
                    <input 
                        className="inputBoxLogin"
                        value = {passwordValue} 
                        onChange={e => setPasswordValue(e.target.value)}
                        type='password' 
                        name='password' 
                        placeholder="Password:" required/>
                    <button id="loginForgotPassword">Forgot your password?</button>
                    <button 
                        onClick={onLoginClicked}
                        type="button" id="logInButton" >Log In</button>
                    <button onClick={() => {
                        setGoToRegister(true);
                    }}
                        id = "loginRegisterButton" >Don't have an account? Register here!</button>
                </form>
            </div>
        </div>
    )
}

export default Login;

