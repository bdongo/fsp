import { useDispatch, useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'
import NavBar from '../NavBar'
import { indexBusiness } from '../../store/businessPages'

const LandingPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)

    useEffect(()=> {
        dispatch(indexBusiness())
    }, [])

    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>

            <div id="image-container">
            </div>
        </div>
    )
}

export default LandingPage;