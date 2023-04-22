import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, logout, showCurrentUser } from "../store/session"
import { useEffect } from "react"

const UserGreeting = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(getCurrentUser)
    console.log(useSelector(getCurrentUser))

    useEffect(()=> {
        dispatch(showCurrentUser)
    }, [dispatch, currentUser])
    
    return (
        <>
            {/* {currentUser.fName} */}
            <button onClick={() => dispatch(logout())} >logout</button>
        </>
    )

}

export default UserGreeting