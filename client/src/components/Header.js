import { Link } from 'react-router-dom'
import "./header.css"

export default function Header() {

    const onLogout = () => {
        window.alert("Logout")
    }

    return (
        <header className='header'>
          <div className='logo'>
            <Link to='/'>Spending Tracker</Link>
          </div>
          <ul>
              <li>
                <button className='btn btn-header' onClick={onLogout}>
                    Logout
                </button>
              </li>
          </ul>
        </header>
      )
}