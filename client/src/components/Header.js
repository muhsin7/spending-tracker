import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/useAuth";
import { useToken } from "../authentication/useToken";

export default function Header(props) {
  const [popup, setPopup] = useState(false)
  const [changePassword, setChangePassword]=  useState(false)

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
    if (!popup) {
      setChangePassword(false)
    }
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
        <li>
          <div className="header-link">Contact Us</div>
        </li>
        <li>
          <div className="header-link">Home</div>
        </li>
        {true ? (
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
    <h2>Account</h2>
    <ul>
      <li><h3>Name: </h3><div className='box'>Placeholder Name</div></li>
      <li><h3>Email: </h3> <div className='box'>Placeholder Email</div></li>
    </ul>

    {/* <button className='btn password-btn' onClick={toggleChangePassword}>Change Password</button>

    {changePassword && (
        <form>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter new password'
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
              placeholder='Confirm new password'
              onChange={onChange}
              required
            />
          </div>
          <button type='submit' className='btn submit-btn'>
              Submit
            </button>
        </form>
    )}

 */}

    <button className="btn close-btn" onClick={toggleAccountPopup}>
      CLOSE
    </button>
  </div>
  </>
  )}
  </>
  );
}
