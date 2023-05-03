import Review from '../Review';
import './EditModal.css';

const EditModal = ({setShowEditModal, reviewInfo}) => {

    return (
        <div className='edit-modal-background'
         >
            <div className='edit-modal' onClick={e => e.stopPropagation()}>
                <div className='close-button'
                    onClick={()=>setShowEditModal(false)}
                ></div>
                <div id="form-modal-container">
                    <Review
                        reviewInfo={reviewInfo}
                        setShowEditModal={setShowEditModal}
                    />
                </div>
            </div>
        </div>
    )

}

export default EditModal;