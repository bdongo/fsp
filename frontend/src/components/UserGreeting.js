import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, logout, showCurrentUser } from "../store/session"
import { useEffect } from "react"
import { getUser } from "../store/users";

const UserGreeting = ({currentUser}) => {
    const dispatch = useDispatch();
    // const {currentUser} = useSelector(getCurrentUser)
    // const currentUser = useSelector(getUser(id))
    console.log("in user greeting")
    // console.log(id, "id")
    // console.log(useSelector(getUser(id)), 'currentuser')

    if (currentUser === null) {
        return null;
    }
    
    if (sessionStorage.getItem('CurrentUser') === null) {
        return null;
    }
    
    return (
        <>
            <h2>{currentUser.fName}</h2>
            
            <button onClick={() => dispatch(logout())} >Log Out</button>
        </>
    )

}

export default UserGreeting