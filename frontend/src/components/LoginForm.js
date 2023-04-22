import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, login, logout } from "../store/session";
import { useState } from "react";
import UserGreeting from "./UserGreeting";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const currentUser = useSelector(getCurrentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({username, password}))
    }

    return (
        <>  
            <h2>{currentUser ? <UserGreeting/> : null } </h2>
            
            
            <h1>LOGIN</h1>
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