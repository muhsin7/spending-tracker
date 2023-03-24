import { Navigate } from "react-router-dom";
import { useState } from "react";
import "../styles/welcomePage.css";
import graphic from "../images/graphic2.png";
import Background from "./Background";

export default function WelcomePage() {
  const [goToLogin, setGoToLogin] = useState(false);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="welcomePage">
      <Background />
      <div>
        <div className="row">
          <div className="column">
            <div className="welcome-text">
              <h1 className="welcome-header">Save money for a change.</h1>
              <h2 className="welcome-subtitle">
                Manage your budget with ease and convenience.
              </h2>
              <button
                onClick={() => {
                  setGoToLogin(true);
                }}
                type="button"
                className="getStartedButton"
              >
                Get Started
              </button>
            </div>
            <div className="row"></div>
          </div>
          <div className="column welcome-graphic">
            <img src={graphic} alt="Home page graphic" />
          </div>
        </div>
      </div>
    </main>
  );
}
