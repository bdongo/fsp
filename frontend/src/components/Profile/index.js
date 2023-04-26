import { useDispatch, useSelector } from "react-redux"
import profilePic from "../../assets/user.png"
import { logout } from "../../store/session";

const Profile = ({currentUser}) => {
    const dispatch = useDispatch();

    if (currentUser === null) {
        return null;
    }
    
    if (sessionStorage.getItem('CurrentUser') === null) {
        return null;
    }
    
    return (
        <>
            
            <span class="name-text" title={`${currentUser.fName} ${currentUser.lName}`} >
                <img src={profilePic} />
            </span>

            
            <button onClick={() => dispatch(logout())} >Log Out</button>
        </>
    )

}

export default Profile;