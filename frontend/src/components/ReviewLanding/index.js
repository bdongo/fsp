import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ReviewLanding.css';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, reviewIndex } from '../../store/reviews';
import { useEffect } from 'react';

const ReviewLanding = ({shuffleDisplay}) => {
    const dispatch = useDispatch();
    const reviews = useSelector(getReviews);
    const reviewDisplay = Array.from(new Set(shuffleDisplay(reviews)));

    useEffect(() => {
        dispatch(reviewIndex("landing"));
    }, [dispatch]);

    const lastInitial = (lastName) => {
        let result = lastName.split('')[0]
        result += "."
        return result
    }

    const teaserText = (text) => {
        
        let result = text.split(' ')
        if (result.length < 15) {
            return text
        }
        result = result.slice(0, 15).join(' ')
        result += "..."
        return result
    }

    const ratingArr = {
        1: 'one-star-big big-rating',
        2: 'two-stars-big big-rating',
        3: 'three-stars-big big-rating',
        4: 'four-stars-big big-rating',
        5: 'five-stars-big big-rating'
    }

    if (reviews.length === 0) {
        return null;
    }

    return (
        <div className='landing-review-container'>
            <div>
                <h2>Recent Activity</h2>
            </div>
            <ul>
                {reviewDisplay?.slice(0, 3).map((review, idx) =>
                    <li key={idx}> 
                        <h3>{review.authorFName} {lastInitial(review.authorLName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {review.businessName}
                                </h3>
                            </div>
                        </Link>
                        {review?.photos?.length === 1 &&
                            <div className='review-landing-photos-container'>
                                <img
                                    className='review-landing-photo-single'
                                    key={idx}
                                    src={review.photos[0]} />
                            </div>
                        }

                        {review?.photos?.length > 1 &&
                            <div className='review-landing-photos-container'>
                                {review.photos.map((photo, idx) =>
                                    <img
                                        className='review-landing-photo'
                                        key={idx}
                                        src={photo} />
                                )}
                            </div>
                        }
                        <p className='review-blurb'>{teaserText(review.body)}</p>
                        <div className={`landing-margin ${ratingArr[review.rating]}`}/>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(3, 6).map((review, idx) =>
                    <li key={idx}>
                        <h3>{review.authorFName} {lastInitial(review.authorLName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {review.businessName}
                                </h3>
                            </div>
                        </Link>
                        {review?.photos?.length === 1 &&
                            <div className='review-landing-photos-container'>
                                <img
                                    className='review-landing-photo-single'
                                    key={idx}
                                    src={review.photos[0]} />
                            </div>
                        }

                        {review?.photos?.length > 1 &&
                            <div className='review-landing-photos-container'>
                                {review.photos.map((photo, idx) =>
                                    <img
                                        className='review-landing-photo'
                                        key={idx}
                                        src={photo} />
                                )}
                            </div>
                        }
                        <p className='review-blurb'>{teaserText(review.body)}</p>
                        <div className={`landing-margin ${ratingArr[review.rating]}`} />
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(6, 9).map((review, idx) =>
                    <li key={idx}>
                        <h3>{review.authorFName} {lastInitial(review.authorLName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {review.businessName}
                                </h3>
                            </div>
                        </Link>
                        {review?.photos?.length === 1 &&
                            <div className='review-landing-photos-container'>
                                <img
                                    className='review-landing-photo-single'
                                    key={idx}
                                    src={review.photos[0]} />
                            </div>
                        }

                        {review?.photos?.length > 1 &&
                            <div className='review-landing-photos-container'>
                                {review.photos.map((photo, idx) =>
                                    <img
                                        className='review-landing-photo'
                                        key={idx}
                                        src={photo} />
                                )}
                            </div>
                        }
                        <p className='review-blurb'>{teaserText(review.body)}</p>
                        <div className={`landing-margin ${ratingArr[review.rating]}`} />
                    </li>
                )}
            </ul>
        </div>
    )

}

export default ReviewLanding;