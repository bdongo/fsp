import { useDispatch, useSelector } from 'react-redux';
import './BusinessDisplay.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import { getAllBusinesses, indexBusiness } from '../../store/businessPages';
import { useEffect } from 'react';

const BusinessDisplay = ({shuffleDisplay}) => {
    const dispatch = useDispatch();
    const businesses = useSelector(getAllBusinesses)

    useEffect(()=> {

        dispatch(indexBusiness())
    }, [dispatch])

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

    const handleRating = (rating) => {
        const roundedRating = Math.round(rating * 2) / 2;
        return ratingArr[roundedRating] || '';
    };

    const businessDisplay = Array.from(new Set(shuffleDisplay(businesses)))

    if (!businesses) {
        return null;
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