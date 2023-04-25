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

    const showLoginSignupButton = currentPath === '/login' || currentPath === '/signup' || currentUser

    const needSearchBar = currentPath === '/' || currentPath.startsWith('/biz/')

    const needGrayButton = currentPath === '/writeareview' || currentPath.startsWith('/biz/')

    const home = currentPath === '/'


    return (
        <header id="header" 
            className={currentPath === '/' ? 'fixed-top' : 'border-bottom'}>
            <div className="logo-container">
                <Link to="/">
                    <img class="logo" 
                        src={currentPath === '/' ? dLogo : classicLogo } alt="logo" />
                </Link>    
            </div>
           
            {needSearchBar &&
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

            {needGrayButton &&
            <>
                <ul id='action-container'>
                    <li>
                        <Link to='/login'><button className="clear-button-outline nav-button">Log In</button></Link>
                    </li>
                    <li>
                        <Link to='/signup'><button className='red-button nav-button'>Sign Up</button></Link>
                    </li>
                </ul>
            </>
            }
            {home &&
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
            {showLoginSignupButton && <UserGreeting currentUser={currentUser} />}
        </header>
    )
}

export default NavBar;