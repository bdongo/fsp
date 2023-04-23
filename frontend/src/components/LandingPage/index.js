import { useDispatch, useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'

const LandingPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)
    console.log("in landing page")
    console.log(currentUser)

    // useEffect(() => {
    //     dispatch(showCurrentUser())
    // }, [dispatch, currentUser])

    return (
        <>
            <h1>Landing Page</h1>

            {currentUser && <UserGreeting currentUser={currentUser} />}

            {!currentUser && 
                    <Link to='/login'><button>Log In</button></Link>
             
            }


            
        </>
    )
}

export default LandingPage;