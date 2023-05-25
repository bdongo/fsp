import { useEffect, useState } from 'react';
import './ReviewCard.css';

const ReviewCard = ({business}) => {
    const [hoverRating, setHoverRating] = useState(0);


    const hoverStarArr = [
        'blank-star star-rating',
        'yellow-star star-rating',
        'yellow-orange-star star-rating',
        'orange-star star-rating',
        'red-orange-star star-rating',
        'red-star star-rating'
    ]

    const descArr = [
        'Select your rating',
        'Not good',
        "Could've been better",
        "OK",
        "Good",
        "Great"
    ]

    const handleRatingClick = (rating) => {
        const targetUrl = `/writeareview?bizId=${business.id}&rating=${rating}`;
        window.location.href = targetUrl;
    }

    const handleClick = (e) => {
        const targetUrl = `/writeareview?bizId=${business.id}`;
        window.location.href = targetUrl;
    }

    return (
        <div className='review-card' onClick={handleClick}>
            <div className='review-card-img'>
                <img src={business.photos[0]}/>
            </div>
            <div className='review-card-info'>
                <h2>{business.name}</h2>
                <p className='review-card-small'>Do you recommend this business?</p>
                <div className='review-card-star-container' onClick={e => e.stopPropagation()}>
                    <div
                        id='star1'
                        onClick={() => handleRatingClick(1)}
                        onMouseEnter={() => setHoverRating(1)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <i className={hoverRating >= 1 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star2'
                        onClick={() => handleRatingClick(2)}
                        onMouseEnter={() => setHoverRating(2)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <i className={hoverRating >= 2 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star3'
                        onClick={() => handleRatingClick(3)}
                        onMouseEnter={() => setHoverRating(3)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <i className={hoverRating >= 3 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star4'
                        onClick={() => handleRatingClick(4)}
                        onMouseEnter={() => setHoverRating(4)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <i className={hoverRating >= 4 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star5'
                        onClick={() => handleRatingClick(5)}
                        onMouseEnter={() => setHoverRating(5)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <i className={hoverRating === 5 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                </div>
                <small className='review-card-small'>{descArr[hoverRating]}</small>
            </div>
        </div>
    )
}

export default ReviewCard;