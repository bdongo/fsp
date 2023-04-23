import { useDispatch } from "react-redux";
import { useState } from "react";

const FormSignUp = () => {
    const dispatch = useDispatch();
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [birthday, setBirthday] = useState();



    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(login({ username, password }))
        //     .then(() => {
        //         history.pushState('/')
        //     })
        //     .catch(error => {
        //         console.error('login failed', error)
        //     })
    }

    return (
        <>
            <form onSubmit={handleSubmit} >

                <label className="input-a11y">First Name</label>
                <input
                    onChange={(e) => setFName(e.target.value)}
                    placeholder="First Name"
                    required="required"
                />
                <label className="input-a11y">Last Name</label>
                <input
                    onChange={(e) => setLName(e.target.value)}
                    placeholder="Last Name"
                    required="required"
                />

                <label className="input-a11y">Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required="required"
                />

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

                <label>Birthday</label>
                <select></select>


                <input type="submit" value="Log In" />

            </form >
        </>
    )

}

export default FormSignUp;