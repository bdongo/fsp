import { useDispatch, useSelector } from 'react-redux';
import './LoginModal.css';
import profilePic from "../../assets/user.png"
import { demoLogin, getCurrentUser, login } from '../../store/session';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import FormSignUp from '../LoginForm/FormSignUp';
import FormLogin from '../LoginForm/FormLogin';

const LoginModal = ({ setShowLoginModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(getCurrentUser);
    const [showStartModal, setShowStartModal] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    
    if (currentUser) {
        return null
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

    const closeModal = () => {
        setShowLoginModal(false);
        setShowStartModal(true);
        setShowLoginForm(false);
        setShowSignUpForm(false);
    }

    const switchSignUpForm = () => {
        setShowSignUpForm(true);
        setShowStartModal(false);
        setShowLoginForm(false);
    }

    const switchLoginForm = () => {
        setShowLoginForm(true);
        setShowStartModal(false);
        setShowSignUpForm(false);
    }

    return (
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-login' onClick={e=> e.stopPropagation()}>
                <div id="form-modal-container">
                    {showStartModal &&
                        <>
                        <img src={profilePic} />
                            <h2>You're almost done!</h2>

                            <p className='subtle'>
                                Choose how you want to post your review on Yelp
                            </p>
                            

                            <button className="modal-button blue-button" onClick={handleDemo}>Continue With Demo Account</button>
                            <button className="modal-button white-button" onClick={switchSignUpForm}>Continue With Email</button>

                            <div className="break small-footer">
                            <small>Already on Yelp? <small className="link-color" onClick={switchLoginForm}>Log in</small></small>
                            </div>  
                        </>
                    }
                    {showLoginForm &&
                        <>
                        <img src={profilePic} />
                        <h2>You're almost done! Log in to Yelp</h2>
                        <FormLogin/>
                        <div className="break small-footer">
                            <small>Don't want to sign into Yelp? <small className="link-color" onClick={handleDemo}>Use a demo account.</small></small>
                        </div>
                        <div className='divider small-footer'>
                            <small>or</small>
                        </div>
                        <div className="small-footer">
                            <small>New to Yelp? <small className="link-color" onClick={switchSignUpForm}>Sign up</small></small>
                        </div>  
                        </>  
                    }
                    {showSignUpForm && 
                        <>
                        <img src={profilePic} />
                        <h2>You're almost done! Sign up</h2>
                        <FormSignUp/>
                        <div className="break small-footer">
                            <small>Don't want to sign up for Yelp? <small className="link-color" onClick={handleDemo}>Use a demo account</small></small>
                        </div>
                        <div className='divider small-footer'>
                            <small>or</small>
                        </div>
                        <div className="small-footer">
                            <small>Already on Yelp? <small className="link-color" onClick={switchLoginForm}>Log in</small></small>
                        </div>  
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginModal;