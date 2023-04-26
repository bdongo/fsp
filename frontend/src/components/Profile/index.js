import { useDispatch, useSelector } from "react-redux"
import "./Profile.css"
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
        <div class="name-text">
            <span className="name-text-tooltip" >
                {currentUser.fName} {currentUser.lName}
            </span>
            <img src={profilePic} />
        </div>

            
            <button onClick={() => dispatch(logout())} >Log Out</button>
        </>
    )

}

export default Profile;