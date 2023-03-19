import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../authentication/useToken";
import { useAuth } from "../authentication/useAuth";
import Background from "./Background";

function Login() {
  const [token, setToken] = useToken();
  const [auth, setAuth] = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [goToRegister, setGoToRegister] = React.useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  if (goToRegister) {
    return <Navigate to="/register" />;
  }

  const handleValidation = () => {
    let formIsValid = true;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(this.state.email) === false) {
      formIsValid = false;
      setErrorMessage("Please enter a valid email.");
    }
    return formIsValid;
  };

  const onLoginClicked = async (e) => {
    e.preventDefault();
    if (handleValidation) {
      await axios.post("/api/user/login", {
        email: emailValue,
        password: passwordValue,
      }).then((res) => {
        console.log(res.status);
        const { token } = res.data;
        setToken(token);
        setAuth(true);
        navigate("/dashboard");
      });
    }
  };


  return (
    <main className="registerPage">
        <Background />
      <section className="form">
        <h1 className="form-header">Login</h1>

        <div className="fieldset">
          <form onSubmit={onLoginClicked}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={emailValue}
                placeholder="Email"
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={passwordValue}
                placeholder="Password"
                onChange={(e) => setPasswordValue(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div class="login-signup-link">Don't have an account? <Link to="/register">Register here!</Link></div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
