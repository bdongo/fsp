import { useDispatch, useSelector } from "react-redux"
import "./Profile.css"
import profilePic from "../../assets/user.png"
import { logout } from "../../store/session";
import { useRef, useState, useEffect } from "react";

const Profile = ({currentUser}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dropDownRef])

    if (currentUser === null) {
        return null;
    }
    
    if (sessionStorage.getItem('CurrentUser') === null) {
        return null;
    }

    return (
        <>
            <div class="name-text" ref={dropDownRef} onClick={() => setOpen(!open)}>
            <span className={open ? "name-text-tooltip clicked" : "name-text-tooltip"} >
                {currentUser.fName} {currentUser.lName}
            </span>
            <img src={profilePic} />
            {open && 
                <div className="dropdown">
                    <a onClick={() => dispatch(logout())} >
                        Log out
                    </a>
                </div>
            }
        </div>
        </>
    )

}

export default Profile;