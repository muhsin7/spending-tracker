import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/welcomePage.css';
import graphic from "../images/graphic.png";

export default function WelcomePage() {

    const navigate = useNavigate();
    const [goToLogin, setGoToLogin] = React.useState(false);

    if(goToLogin){
        return<Navigate to="/login"/>;
    }
        
    return(
        <main className="welcomePage">
            <div>
                <div className="row">
                    <div className="column">
                    <h1 className = "welcome-header">Save money for a change.</h1>
                    <h2 className ="welcome-subtitle">Manage your budget with ease and convenience.</h2>
                    <div className="row">
                    <button onClick={() => {
                        setGoToLogin(true);
                    }} 
                    type="button" className="getStartedButton">Get Started</button>
                    </div>
                    </div>
                    <div className="column welcome-graphic">
                    <img src={graphic} alt="Home page graphic"/>
                    </div>
                </div>
            </div>
        </main>
    )
    
}