import { useDispatch, useSelector } from 'react-redux';
import './SuggestedReviews.css';
import { useEffect, useState } from 'react';
import { getAllBusinesses, indexBusiness, showState } from '../../store/businessPages'
import ReviewCard from '../ReviewCard';

const SuggestedReviews = () => {
    const [numReviews, setNumReviews] = useState(6);
    const dispatch = useDispatch()
    const businesses = useSelector(getAllBusinesses)

    useEffect(()=> {
        dispatch(indexBusiness())
    }, [dispatch])

    const handleShowMore = () => {
        setNumReviews(numReviews+6)
    }
    return (
        <div className='find-review-container'>
            <div className='find-review-container-text'>
                <h1>Find a business to review</h1>
                <h3>Visited one of these places recently?</h3>
            </div>
            {/* <SearchBar/> */}
            <div className='suggested-reviews-container'>
                
                {businesses?.slice(0,numReviews).map((business, idx) =>
                        <ReviewCard business={business} key={idx}/>
                )}
            </div>

           {numReviews === 6 &&
            <div onClick={handleShowMore}>Show more suggestions</div>
            }
        </div>
    )
}

export default SuggestedReviews;