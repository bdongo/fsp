import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, login, logout, showCurrentUser } from "../../store/session";
import { useState } from "react";
import UserGreeting from "../UserGreeting";
import { useEffect } from "react";
import './LoginForm.css'
import { Redirect, useHistory, Link, useLocation } from "react-router-dom";

const FormLogin = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const currentUser = useSelector(getCurrentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
            .then(() => {
                history.pushState('/')
            })
            .catch(error => {
                console.error('login failed', error)
            })
    }


    return (
        <>
            <form onSubmit={handleSubmit} >

            <label className="input-a11y">Username</label>
            <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required="required"
            />

            <label className="input-a11y">Password</label>
            <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required="required"
            />


            <input type="submit" value="Log In" />

            </form >
        </>
    )
}

export default FormLogin;