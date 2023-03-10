import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/welcomePage.css';

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
                    <h1>Save money for a change.</h1>
                    <h2>sex helps you manage your budget with ease and convenience.</h2>
                    <div className="row">
                    <button onClick={() => {
                        setGoToLogin(true);
                    }} 
                    type="button" id="getStartedButton">Get Started</button>
                    </div>
                    </div>
                    <div className="column">
                    <h1>[PLACEHOLDER IMAGE]</h1>
                    </div>
                </div>
            </div>
        </main>
    )
    
}