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

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId));
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
                    {currentUser?.id === review.authorId &&
                        <>
                            <button
                                onClick={()=>handleShowEdit(idx)}
                            >Edit Review</button>

                            <button
                                onClick={() => handleDelete(review?.id)}
                            >Delete review</button>
                        </>
                    }
                </li>
            )}
        </ul>
        </>
    )
}

export default BusinessReviews;