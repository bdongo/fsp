import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/logo.png';

const NavBar = () => {

    return (
        <header id="header">
            <div className="logo-container">
                <Link to="/">
                    <img class="logo" src={logo} alt="logo" />
                </Link>
            </div>
        </header>
    )
}

export default NavBar;