import { useDispatch, useSelector } from "react-redux";
import { demoLogin, getCurrentUser, login, logout, showCurrentUser } from "../../store/session";
import { useState } from "react";
import { useEffect } from "react";
import './LoginForm.css'
import { Redirect, useHistory, Link, useLocation } from "react-router-dom";
import FormLogin from "./FormLogin";
import FormSignUp from "./FormSignUp";
import NavBar from "../NavBar";

const LoginForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const location = useLocation();
    const currentPath = location.pathname;
    const history = useHistory();
    useEffect(() => {
        dispatch(showCurrentUser())
    }, [dispatch, currentUser])

    useEffect(() => {
        if (currentPath === '/login'){
            document.title = "Log In - ylp";
        } else {
            document.title = "Sign Up - ylp";
        }
    }, []);

    if (currentUser) {
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
        <div>
            <div id="form-container">
                <div className="form">
                    <h2>{currentPath === '/login' ?
                        'Log in to ylp' : 'Sign Up for ylp'}</h2>

                    {currentPath === '/login' &&
                        <p className="subheading">
                            New to ylp? <Link className="link" to="/signup">Sign Up</Link>
                        </p>}

                    {currentPath === '/signup' &&
                        <p className="subheading">
                            Connect with great local businesses
                        </p>}

                    <button className="button blue-button" onClick={handleDemo}>Continue With Demo Account</button>
                    <button className="button white-button" onClick={handleDemo}>Continue With Demo Account</button>
                    <button className="button black-button" onClick={handleDemo}>Continue With Demo Account</button>

                    
                    <div className="spacer">OR</div>

                    {currentPath === '/login' && <FormLogin />}
                    {currentPath === '/signup' && <FormSignUp />}

                    {currentPath === '/login' &&
                        <div className="small-footer align-right subtle">
                            <small>New to ylp? <Link className="link" to="/signup">Sign up</Link></small>
                        </div>
                    }
                    {currentPath === '/signup' &&
                        <div className="small-footer align-right subtle"> 
                            <small>Already on ylp? <Link className="link" to="/login">Log in</Link></small>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginForm;