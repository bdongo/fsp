import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import classicLogo from '../../assets/classic-logo.png';
import dLogo from '../../assets/white-logo.png'
import { getCurrentUser } from '../../store/session'
import { useSelector } from 'react-redux'
import SearchBar from '../SearchBar';
import Profile from '../Profile';

const NavBar = () => {
    const currentUser = useSelector(getCurrentUser)
    const location = useLocation();
    const currentPath = location.pathname;
    
    const showProfile = currentUser

    const needSearchBar = currentPath === '/' || currentPath.startsWith('/biz/');

    const needGrayButton = currentPath === '/writeareview' || currentPath.startsWith('/biz/')

    const home = currentPath === '/' || !currentUser


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
                <div >
                        <SearchBar />
                </div>
                <div >
                    <Link className='nav-sub-header' to="/writeareview">Write a Review</Link>
                </div>
                </>
            }

            {!currentUser && needGrayButton &&
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
            {!currentUser && home &&
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
            {showProfile && <Profile currentUser={currentUser} />}
        </header>
    )
}

export default NavBar;