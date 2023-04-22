import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, login, logout, showCurrentUser } from "../../store/session";
import { useState } from "react";
import UserGreeting from "../UserGreeting";
import { useEffect } from "react";
import './LoginForm.css'
import { Redirect, useHistory } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const currentUserId = useSelector(getCurrentUserId);

    useEffect(() => {
        dispatch(showCurrentUser())
    }, [dispatch, currentUserId])

    if (currentUserId) {
        // console.log(currentUserId)
        return <Redirect to="/" />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({username, password}))
            .then(()=> {
                history.pushState('/')
            })
            .catch(error=> {
                console.error('login failed', error)
            })
    }

    return (
        <>  
            <h1>LOG IN</h1>
            <form onSubmit={handleSubmit} > 

            <label>username
                <input onChange={(e)=> setUsername(e.target.value)} />
            </label>

             <label>password
                <input onChange={(e)=> setPassword(e.target.value)}/>
            </label>

            <input type="submit" value="Log In"/>

            </form>

            
        </>
    )
}

export default LoginForm;