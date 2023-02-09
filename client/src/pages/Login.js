import React from "react";
import './Login.css';
import { Navigate } from "react-router-dom";

function Login() {

        const [goToRegister, setGoToRegister] = React.useState(false);

        if(goToRegister){
            return<Navigate to="/register"/>;
        }

        return(
            <div className="div-login">
                <h2>Login</h2>
                <div>
                    <form>
                        <input type='email' name='email' placeholder="Email:" required/>
                        <input type='password' name='password' placeholder="Password:" required/>
                        <button id="forgotPassword">Forgot your password?</button>
                        <button type="submit" id="logInButton" >Log In</button>
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