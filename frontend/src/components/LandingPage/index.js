import { useDispatch, useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'
import NavBar from '../NavBar'

const LandingPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)

    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>

            <div id="image-container">
            </div>

            {currentUser && <UserGreeting currentUser={currentUser} />}

            {/* {!currentUser &&
                <ul>
                    <li>
                        <Link to='/login'><button>Log In</button></Link>
                    </li>
                    <li>
                        <Link to='/signup'><button>Sign Up</button></Link>
                    </li>
                </ul>
            } */}


            
        </div>
    )
}

export default LandingPage;