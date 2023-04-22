import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserId, logout, showCurrentUser } from "../store/session"
import { useEffect } from "react"
import { getUser } from "../store/users";

const UserGreeting = ({id}) => {
    const dispatch = useDispatch();
    const {currentUserId} = useSelector(getCurrentUserId)
    const currentUser = useSelector(getUser(id))

    if (!id) {
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