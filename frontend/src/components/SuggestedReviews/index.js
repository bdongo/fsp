import { useDispatch, useSelector } from 'react-redux';
import './SuggestedReviews.css';
import { useEffect } from 'react';
import { getAllBusinesses, indexBusiness, showState } from '../../store/businessPages'
import ReviewCard from '../ReviewCard';

const SuggestedReviews = () => {
    const dispatch = useDispatch()
    const businesses = useSelector(getAllBusinesses)

    useEffect(()=> {
        dispatch(indexBusiness())
    }, [dispatch])
    return (
        <div className='review-container'>
            <h1>Find a business to review!</h1>
            {/* <SearchBar/> */}

            <div className='suggested-reviews-container'>
                <h3>Visited one of these places recently?</h3>
                {businesses?.slice(0,6).map((business, idx) =>
                        <ReviewCard business={business} key={idx}/>
                )}
            </div>
        </div>
    )
}

export default SuggestedReviews;