import { useDispatch, useSelector } from "react-redux";
import { demoLogin, getCurrentUser, login, logout, showCurrentUser } from "../../store/session";
import { useState } from "react";
import UserGreeting from "../UserGreeting";
import { useEffect } from "react";
import './LoginForm.css'
import { Redirect, useHistory, Link, useLocation } from "react-router-dom";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";

const LoginForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();

    console.log("in login form")
    useEffect(() => {
        dispatch(showCurrentUser())
    }, [dispatch, currentUser])

    if (currentUser) {
        // console.log(currentUserId)
        return <Redirect to="/" />
    }

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(demoLogin())
            .then(() => {
                history.pushState('/')
            })
            .catch(error => {
                console.error('login failed', error)
            })
    }

    return (
        <>  
            <h2>{currentPath === '/login' ?
                'Log in to Yelp' : 'Sign Up for Yelp'}</h2>

            {currentPath === '/login' && <p className="subheading">New to Yelp?  <Link to="/signup">Sign Up</Link> </p>}
           

            <button onClick={handleDemo}>Continue With Demo Account</button>

            
            <fieldset>
                <legend align="center">OR</legend>
            </fieldset>

            {currentPath === '/login' && <FormLogin/> }
            {currentPath === '/signup' && <FormSignUp />}

            
        </>
    )
}

export default LoginForm;