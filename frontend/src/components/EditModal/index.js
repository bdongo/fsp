import { useState } from 'react';
import Review from '../Review';
import './EditModal.css';

const EditModal = ({setShowEditModal, reviewInfo}) => {
    const [error, setError] = useState();
    const [clicks, setClicks] = useState(0);

    const handleClose = () => {

        return () => {
            setClicks(clicks+1)
            if (clicks === 0) {
                setError("Changes will not save if you close editor. Click again to confirm")
            } else if (clicks === 1) {
                setShowEditModal(false)
            }     
        }
    }

    return (
        <div className='edit-modal-background'
         >
            <div className='edit-modal' onClick={e => e.stopPropagation()}>
                <div className='close-button'
                    onClick={handleClose()}
                ></div>
                <div id="form-modal-container">
                    <Review
                        error={error}
                        reviewInfo={reviewInfo}
                        setShowEditModal={setShowEditModal}
                    />
                </div>
            </div>
        </div>
    )

}

export default EditModal;