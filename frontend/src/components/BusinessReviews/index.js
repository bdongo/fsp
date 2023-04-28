import { useDispatch } from 'react-redux';
import './BusinessReviews.css';
import { deleteReview } from '../../store/reviews';

const BusinessReviews = ({reviews, users, currentUser}) => {
    const dispatch = useDispatch();

    const handleDelete = (reviewId) => {
        // console.log(reviewId, "reviewID")
        // e.preventDefault();
        dispatch(deleteReview(reviewId));
    }
    
    return (
        <ul className='businessreview-container'>
            {reviews?.map((review, idx) =>
                <li key={idx}>
                    <h2>{users[review.authorId].fName} {users[review.authorId].lName}</h2>
                    <p>rating: {review.rating} </p>
                    <p>{review.body}</p>
                    {currentUser.id === review.authorId &&
                        <button
                            onClick={() => {
                                
                                return handleDelete(review.id)}}
                        >Delete review</button>
                    }
                </li>
            )}
        </ul>
    )
}

export default BusinessReviews;