import React from "react";
import './Login.css';

export default function Login() {
        return(
            <div className="div-login">
                <h2>Login</h2>
                <div>
                    <form>
                        <input type='email' name='email' placeholder="Email:" required/>
                        <input type='password' name='password' placeholder="Password:" required/>
                        <button type="submit" id="logInButton" >Log In</button>
                        <button id = "registerButton" >Don't have an account? Register here!</button>
                    </form>
                </div>
            </div>
        )
    
}