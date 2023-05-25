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
 
    
    const lastInitial = (lastName) => {
        let result = lastName.split('')[0]
        result += "."
        return result
    }
    
    const ratingArr = {
        0.5: 'one-star-big big-rating',
        1: 'one-star-big big-rating',
        1.5: 'one-half-stars-big big-rating',
        2: 'two-stars-big big-rating',
        2.5: 'two-half-stars-big big-rating',
        3: 'three-stars-big big-rating',
        3.5: 'three-half-stars-big big-rating',
        4: 'four-stars-big big-rating',
        4.5: 'four-stars-big big-rating',
        5: 'five-stars-big big-rating'
    }
    
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
    
    const handleRating = (rating) => {
        const roundedRating = Math.round(rating * 2) / 2;
        return ratingArr[roundedRating] || '';
    };

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