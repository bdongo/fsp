import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png';
import { getCurrentUser } from '../../store/session'
import { useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'

const NavBar = () => {
    const currentUser = useSelector(getCurrentUser)
    const location = useLocation();
    const currentPath = location.pathname;

    let navDisplay = true;
    if (currentUser || currentPath === '/login' || currentPath === '/signup') {
        navDisplay = false;
    }

    return (
        <header id="header" 
            className={navDisplay ? 'fixed-top' : ''}>
            <div className="logo-container">
                <Link to="/">
                    <img class="logo" src={logo} alt="logo" />
                </Link>

                {navDisplay && <UserGreeting currentUser={currentUser} />}

                {navDisplay &&
                    <ul id='action-container'> 
                        <li>
                            <Link to='/login'><button className="clear-button nav-button">Log In</button></Link>
                        </li>
                        <li>
                            <Link to='/signup'><button className='red-button nav-button'>Sign Up</button></Link>
                        </li>
                    </ul>
                }
            </div>
        </header>
    )
}

export default NavBar;