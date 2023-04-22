import { useDispatch, useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import './LandingPage.css'
import { getCurrentUserId, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'

const LandingPage = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId)

    useEffect(() => {
        dispatch(showCurrentUser())
    }, [dispatch, currentUserId])

    return (
        <>
            <h1>Landing Page</h1>

            {currentUserId && <UserGreeting id={currentUserId} />}

            {!currentUserId && 
                    <Link to='/login'><button>Log In</button></Link>
             
            }


            
        </>
    )
}

export default LandingPage;