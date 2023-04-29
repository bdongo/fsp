import { useDispatch, useSelector } from 'react-redux';
import './LoginModal.css';
import { demoLogin, getCurrentUser } from '../../store/session';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LoginModal = ({ setShowLoginModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(getCurrentUser);
    
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
    }
    
    return (
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-login'>
                <div id="form-container">
                    <div className="form">
                        <h2>This is the H2</h2>

                        <p className="subheading">
                            Choose how you want to post your review on Yelp
                        </p>

                        <button className="button blue-button" onClick={handleDemo}>Continue With Demo Account</button>
                        <button className="button white-button" onClick={handleDemo}>Continue With Demo Account</button>
                        <button className="button black-button" onClick={handleDemo}>Continue With Demo Account</button>

                        <div className="small-footer align-right subtle">
                            <small>Already on Yelp? <Link className="link" to="/login">Log in</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;