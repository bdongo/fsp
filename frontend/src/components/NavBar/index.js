import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import classicLogo from '../../assets/classic-logo.png';
import dLogo from '../../assets/white-logo.png'
import { getCurrentUser } from '../../store/session'
import { useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import SearchBar from '../SearchBar';

const NavBar = () => {
    const currentUser = useSelector(getCurrentUser)
    const location = useLocation();
    const currentPath = location.pathname;

    let navDisplay = true;
    if (currentUser || currentPath === '/login' || currentPath === '/signup') {
        navDisplay = false;
    }

    const splashBar = currentPath !== '/login' || currentPath !== '/signup'


    return (
        <header id="header" 
            className={!splashBar ? 'fixed-top' : 'border-bottom'}>
            <div className="logo-container">
                <Link to="/">
                    <img class="logo" 
                        src={currentPath === '/' ? dLogo : classicLogo } alt="logo" />
                </Link>    
            </div>
           
            {splashBar &&
                <>
                    <div>
                        <SearchBar />
                    </div>

                    <div>
                        Yelp for Business
                    </div>

                    <div>
                        <Link className="link" to="/writeareview">Write a Review</Link>
                    </div>
                </>
            }

            {navDisplay &&
            <>
                <ul id='action-container'>
                    <li>
                        <Link to='/login'><button className="clear-button nav-button">Log In</button></Link>
                    </li>
                    <li>
                        <Link to='/signup'><button className='red-button nav-button'>Sign Up</button></Link>
                    </li>
                </ul>
            </>
            }
            {navDisplay && <UserGreeting currentUser={currentUser} />}
        </header>
    )
}

export default NavBar;