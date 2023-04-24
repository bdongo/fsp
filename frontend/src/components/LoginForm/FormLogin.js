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
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
            .then(() => {
                history.pushState('/')
            })
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }


    return (
        <div className="form">
            <form onSubmit={handleSubmit} className="form" >

                <label className="input-a11y">Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required="required"
                />

                <label className="input-a11y">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required="required"
                />

                <div>
                <input className="button red-button" type="submit" value="Log In" />
                </div>
                <ul className="error-container">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </form >
        </div>
    )
}

export default FormLogin;