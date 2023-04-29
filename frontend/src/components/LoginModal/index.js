import { useSelector } from 'react-redux';
import './LoginModal.css';
import { getCurrentUser } from '../../store/session';

const LoginModal = () => {
    const currentUser = useSelector(getCurrentUser);
    if (currentUser) {
        return null
    }
    
    return (
        <div className='modal-background'>
            <div className='modal-login'>

            </div>
        </div>
    )
}

export default LoginModal;