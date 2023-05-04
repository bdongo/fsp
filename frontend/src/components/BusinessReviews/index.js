import { useDispatch } from 'react-redux';
import './BusinessReviews.css';
import { deleteReview } from '../../store/reviews';
import { useState } from 'react';
import EditModal from '../EditModal';
import { useEffect } from 'react';

const BusinessReviews = ({reviews, currentUser, biz}) => {
    const dispatch = useDispatch();
    const [reviewInfo, setReviewInfo] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [error, setError] = useState();
    const [clicks, setClicks] = useState(0);
 
    const handleDelete = (reviewId) => {
        // let clicks = 0;
        return () => {
            setClicks(clicks+1)
            if (clicks === 0) {
                setError("Are you sure you want to delete your review? Click again to confirm")
            } if (clicks === 1) {
                dispatch(deleteReview(reviewId))
                setClicks(0)
            }
        }     
    }

    const lastInitial = (lastName) => {
        let result = lastName.split('')[0]
        result += "."
        return result
    }
    
    const handleRating = (rating) => {
        if (rating === 1) {
            return 'one-star-big big-rating medium-rating';
        } else if (rating === 2) {
            return 'two-stars-big big-rating medium-rating';
        } else if (rating === 3) {
            return 'three-stars-big big-rating medium-rating';
        } else if (rating === 4) {
            return 'four-stars-big big-rating medium-rating';
        } else if (rating === 5) { 
            return 'five-stars-big big-rating medium-rating';
        }
    } 

    const handleShowEdit = (idx)=> {
        setReviewInfo(reviews[idx])
        setShowEditModal(!showEditModal)
    }
    
    return (
        <>
            {showEditModal &&
                <EditModal 
                    setShowEditModal={setShowEditModal} 
                    reviewInfo={reviewInfo}
                />
            }
        <ul className='businessreview-container'>
            {reviews?.map((review, idx) =>
                <li key={idx} 
                    onClick={e => e.stopPropagation()}
                >
                    <h2>{review.authorFName} {lastInitial(review.authorLName)}</h2>

                    <div className={handleRating(review.rating)} />
  
                    <p>{review.body}</p>
                    <div className='bottom-buttons'>
                        
                        {currentUser?.id === review.authorId &&
                            <>
                            <p className='warning'>{error}</p>
                            <button
                                    onClick={()=>handleShowEdit(idx)}
                                >Edit</button>

                                |<button
                                    onClick={handleDelete(review?.id)}
                                >Delete</button>
                            </>
                        }
                    </div>
                </li>
            )}
        </ul>
        </>
    )
}

export default BusinessReviews;