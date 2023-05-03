import { useDispatch, useSelector } from 'react-redux';
import './BusinessDisplay.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';

const BusinessDisplay = ({businessDisplay}) => {
    // const [rating, setRating] = useState('zero-stars-big big-rating');

    const handleRating = (ratingAverage) => {
        if (ratingAverage < 1.25) {
            return 'one-star-big big-rating';
        } else if (ratingAverage < 1.875) {
           return 'one-half-stars-big big-rating';
        } else if (ratingAverage < 2.25) {
            return 'two-stars-big big-rating';
        } else if (ratingAverage < 2.875) {
            return 'two-half-stars-big big-rating';
        } else if (ratingAverage < 3.25) {
            return 'three-stars-big big-rating';
        } else if (ratingAverage < 3.875) {
            return 'three-half-stars-big big-rating';
        } else if (ratingAverage < 4.3) {
            return 'four-stars-big big-rating';
        } else if (ratingAverage < 5) {
            return 'five-stars-big big-rating';
        }
    }


    return (
        <>
            <div className='landing-business-container'>
                <div>
                    <h2>Recommended Places</h2>
                </div>
                <ul>
                    {businessDisplay?.slice(0, 3).map((biz, idx) =>
                        <li key={idx}>
                            <Link className="display-link link" to={`/biz/${biz.id}`}>
                                <div>
                                    <div className='picture-icon'>
                                        <img src={biz.photos[0]} />
                                    </div>
                                    <h3 className='icon-title'> {biz.name} </h3>
                                    <div className={`rating ${handleRating(biz.averageRating)}`} />
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {businessDisplay?.slice(3, 6).map((biz, idx) =>
                        <li key={idx}>
                            <Link className="display-link link" to={`/biz/${biz.id}`}>
                                <div>
                                    <div className='picture-icon'>
                                        <img src={biz.photos[0]} />
                                    </div>
                                    <h3 className='icon-title'> {biz.name} </h3>
                                    <div className={`rating ${handleRating(biz.averageRating)}`} />
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {businessDisplay?.slice(6, 9).map((biz,idx) =>
                        <li key={idx}>
                            <Link className="display-link link" to={`/biz/${biz.id}`}>
                                <div>
                                    <div className='picture-icon'>
                                        <img src={biz.photos[0]} />
                                    </div>
                                    <h3 className='icon-title'> {biz.name} </h3>
                                    <div className={`rating ${handleRating(biz.averageRating)}`} />
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
        </div>   
    </>
    )
}

export default BusinessDisplay;