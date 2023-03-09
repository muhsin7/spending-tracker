import { Link } from 'react-router-dom'
import { useAuth } from '../authentication/useAuth';

export default function Header({isAuth, setAuth}) {

    const onLogout = () => {
        // window.alert("Logout")
        localStorage.removeItem('token');
        setAuth(false);
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
                  <li>
                <button className='btn btn-header btn-ghost' onClick={onLogout}>
                    Sign up
                </button>
              </li>
              <li>
                <button className='btn btn-header' onClick={onLogout}>
                    Login
                </button>
              </li></>
                )
              }
          </ul>
        </header>
      )
}