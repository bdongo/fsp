import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import classicLogo from '../../assets/classic-logo.png';
import dLogo from '../../assets/white-logo.png'
import { getCurrentUser } from '../../store/session'
import { useSelector } from 'react-redux'
import SearchBar from '../SearchBar';
import Profile from '../Profile';
import AuthButtons from '../AuthButtons';

const NavBar = () => {
    const currentUser = useSelector(getCurrentUser)
    const location = useLocation();
    const currentPath = location.pathname;
    
    const showProfile = currentUser

    const needSearchBar = currentPath === '/' || currentPath.startsWith('/biz/');
    
    return (
        <header id="header" 
            className={currentPath === '/' ? 'fixed-top' : 'border-bottom'}>
            <div className="logo-container">
                <Link to="/">
                    <img className="logo" 
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

            { !currentUser && 
                <AuthButtons/>
            }
            {showProfile && <Profile currentUser={currentUser} />}
        </header>
    )
}

export default NavBar;