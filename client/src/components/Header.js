import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import { useToken } from "../authentication/useToken";

export default function Header(props) {
  const [popup, setPopup] = useState(false)
  const [user, setUser] = useState({});

  const [isAuth, setAuth] = props.auth;
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  const onLogout = () => {
    // window.alert("Logout")
    // localStorage.removeItem('token');
    setToken("");
    setAuth(false);
    localStorage.clear();
    navigate("/");
  };

  const toggleAccountPopup = () => {
    setPopup(!popup)
  };

  return (
    <>
    <header className="header">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <div className="logo">
          <div className="logo-text">AllGood</div>
        </div>
      </Link>

      <ul className="header-links">
        {isAuth ? (
          <>
            <Link to={"/payments"}>
              <li>
                <div className="header-link">Payments</div>
              </li>
            </Link>
            <Link to={"/categories"}>
              <li>
                <div className="header-link">Categories</div>
              </li>
            </Link>
            <Link to={"/register"}>
              <li>
                <div className="header-link">Limits</div>
              </li>
            </Link>
            <Link to={"/register"}>
              <li>
                <div className="header-link">Reports</div>
              </li>
            </Link>
          </>
        ) : (
          []
        )}
        {isAuth ? (
          <>
          <li>
            <div className="header-link" onClick={toggleAccountPopup}>Account</div>
          </li>
          <li>
            <button
              className="btn btn-header btn-ghost error"
              onClick={onLogout}
              >
              Log out
            </button>
          </li>
          </>
        ) : (
          <>
            <Link to={"/register"}>
              <li>
                <button className="btn btn-header btn-ghost" onClick={onLogout}>
                  Sign up
                </button>
              </li>
            </Link>
            <Link to={"/login"}>
              <li>
                <button className="btn btn-header" onClick={onLogout}>
                  Login
                </button>
              </li>
            </Link>
          </>
        )}
      </ul>
    </header>


{popup && (
  <>
  <div className='overlay' onClick={toggleAccountPopup}></div>
    <div className='popup'>
    <h2>Account details</h2>
    <ul>
      <li><h3>Name: </h3><div className='box'>{user.name}</div></li>
      <li><h3>Email: </h3> <div className='box'>{user.email}</div></li>
    </ul>

    <button className="btn close-btn" onClick={toggleAccountPopup}>
      CLOSE
    </button>
  </div>
  </>
  )}
  </>
  );
}
