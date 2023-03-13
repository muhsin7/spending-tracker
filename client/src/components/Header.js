import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../authentication/useAuth';
import { useToken } from '../authentication/useToken';

export default function Header(props) {
    const [isAuth, setAuth] = props.auth;
    const [token, setToken] = useToken();
    const navigate = useNavigate();

    const onLogout = () => {
        // window.alert("Logout")
        // localStorage.removeItem('token');
        setToken("");
        setAuth(false);
        navigate("/");
    }

    return (
        <header className='header'>
          <div className='logo'>
          <div className='logo-text'>AllGood</div>
          </div>
          <ul className='header-links'>
              <li>
                <div className='header-link'>Contact Us</div>
              </li>
              <li>
                <div className='header-link'>About</div>
              </li>
              <li>
                <div className='header-link'>Home</div>
              </li>
              {
                isAuth ?(<li>
                  <button className='btn btn-header btn-ghost error' onClick={onLogout}>
                      Log out
                  </button>
                </li>) : (
                  <>
                <Link to={"/register"}>
                  <li>
                  <button className='btn btn-header btn-ghost' onClick={onLogout}>
                      Sign up
                  </button>
              </li>
                </Link>
              <Link to={"/login"}>
              <li>
                <button className='btn btn-header' onClick={onLogout}>
                    Login
                </button>
              </li>
              </Link>
              </>
                )
              }
          </ul>
        </header>
      )
  // const [popup, setPopup] = useState(false)
  // const [changePassword, setChangePassword]=  useState(false)
  // const [formData, setFormData] = useState({
  //   password: '',
  //   password2: '',
  // })
  // const {password, password2 } = formData

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //   }))
  //   }

  // const onLogout = () => {
  //   window.alert("Logout")
  // }

  // const toggleAccountPopup = () => {
  //   setPopup(!popup)
  //   if (!popup) {
  //     setChangePassword(false)
  //   }
  // }

  // const toggleChangePassword = () => {
  //   setChangePassword(!changePassword)
  // }

  // return (
  //   <>
  //     <header className='header'>
  //       <div className='logo'>
  //         <Link to='/'>Spending Tracker</Link>
  //       </div>
  //       <ul>
  //         <li>
  //           <button className='acc-btn' onClick={toggleAccountPopup}>
  //             Account
  //           </button>
  //           <button className='btn btn-header' onClick={onLogout}>
  //               Logout
  //           </button>

  //         </li>
  //       </ul>
  //     </header>

  //     {popup && (
  //     <>
  //     <div className='overlay' onClick={toggleAccountPopup}></div>
  //       <div className='popup'>
  //       <h2>Account Details</h2>
  //       <ul>
  //         <li><h3>Name: </h3><div className='box'>Placeholder Name</div></li>
  //         <li><h3>Email: </h3> <div className='box'>Placeholder Email</div></li>
  //       </ul>
  //       <button className='btn password-btn' onClick={toggleChangePassword}>Change Password</button>

  //       {changePassword && (
  //           <form>
  //             <div className='form-group'>
  //               <input
  //                 type='password'
  //                 className='form-control'
  //                 id='password'
  //                 name='password'
  //                 value={password}
  //                 placeholder='Enter new password'
  //                 onChange={onChange}
  //                 required
  //               />
  //             </div>
  //             <div className='form-group'>
  //               <input
  //                 type='password'
  //                 className='form-control'
  //                 id='password2'
  //                 name='password2'
  //                 value={password2}
  //                 placeholder='Confirm new password'
  //                 onChange={onChange}
  //                 required
  //               />
  //             </div>
  //             <button type='submit' className='btn submit-btn'>
  //                 Submit
  //               </button>
  //           </form>
  //       )}



  //       <button className="btn close-btn" onClick={toggleAccountPopup}>
  //         CLOSE
  //       </button>
  //     </div>
  //     </>
  //     )}

  //   </>
  //   )
}