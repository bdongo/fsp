import { useDispatch, useSelector } from 'react-redux';
import './SuggestedReviews.css';
import { useEffect, useState } from 'react';
import { getAllBusinesses, indexBusiness, showState } from '../../store/businessPages'
import ReviewCard from '../ReviewCard';
import { getCurrentUser } from '../../store/session';

const SuggestedReviews = () => {
    const [numReviews, setNumReviews] = useState(6);
    const dispatch = useDispatch()
    const businesses = useSelector(getAllBusinesses)
    const currentUser = useSelector(getCurrentUser)

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
                
                {!currentUser && businesses?.slice(0,numReviews).map((business, idx) =>
                        <ReviewCard business={business} key={idx}/>
                )}
                {currentUser && businesses?.slice(0, numReviews).map((business, idx) => {
                    <ReviewCard business={business} key={idx} />
                })}
            </div>

           {numReviews === 6 &&
                <div className='show-more-container' onClick={handleShowMore}>
                    <div className='show-more' onClick={handleShowMore}>Show more suggestions</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(2, 122, 151)" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        </svg>
                </div>
            }
        </div>
    )
}

export default SuggestedReviews;