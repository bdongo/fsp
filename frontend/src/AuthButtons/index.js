import { useLocation, Link } from 'react-router-dom';
import './AuthButtons.css';

const AuthButtons = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const needGrayButton = currentPath === '/writeareview' || currentPath.startsWith('/biz/')

    const home = currentPath === '/'

    return (
        <>
            { needGrayButton &&
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
            { home &&
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
        </>
    )
}

export default AuthButtons;
