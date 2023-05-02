import Review from '../Review';
import './EditModal.css';

const EditModal = ({setShowEditModal, bizInfo, reviewInfo}) => {

    return (
        <div className='edit-modal-background'
        //  onClick={setShowEditModal(false)}
         >
            <div className='edit-modal' onClick={e => e.stopPropagation()}>
                <div className='close-button'
                    onClick={()=>setShowEditModal(false)}
                ></div>
                <div id="form-modal-container">
                    <Review
                        bizInfo={bizInfo}
                        reviewInfo={reviewInfo}
                        setShowEditModal={setShowEditModal}
                    />
                </div>
            </div>
        </div>
    )

}

export default EditModal;