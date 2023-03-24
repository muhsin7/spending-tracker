import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../authentication/useToken";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header(props) {
  const [user, setUser] = useState({});

  const [isAuth, setAuth] = props.auth;
  const [token, setToken] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      axios
        .get("/api/user/profile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
    }
  }, []);

  const onLogout = () => {
    // window.alert("Logout")
    // localStorage.removeItem('token');
    setToken("");
    setAuth(false);
    localStorage.clear();
    navigate("/");
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
              <Link to={"/reports"}>
                <li>
                  <div className="header-link">Reports</div>
                </li>
              </Link>
              <Link to={"/achievements"}>
                <li>
                  <div className="header-link">Achievements</div>
                </li>
              </Link>
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
                  <button
                    className="btn btn-header btn-ghost"
                    onClick={onLogout}
                  >
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
    </>
  );
}
