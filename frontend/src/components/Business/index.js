import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Business.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getBusiness, showBusiness, showState } from '../../store/businessPages';
import NavBar from '../NavBar';
import BusinessReviews from '../BusinessReviews';
import { getReviews } from '../../store/reviews';
import { getCurrentUser } from '../../store/session';

const Business = () => {
    const dispatch = useDispatch();
    const {bizId} = useParams();
    const biz = useSelector(getBusiness(bizId));
    const reviews = useSelector(getReviews);
    const state = useSelector(showState);
    const currentUser = useSelector(getCurrentUser);
    const [_, users, __, ___] = state
    const [rating, setRating] = useState('zero-stars-big big-rating');

    
    const showReviews = reviews.length !== 0

    useEffect(()=> {
        const ratingAverage = calculateRating()
        console.log(ratingAverage)
        if (reviews.length === 0) {
            setRating('zero-stars-big big-rating');
        } else if (ratingAverage < 1.25 ) {
            setRating('one-star-big big-rating');
        } else if (ratingAverage < 1.875) {
            setRating('one-half-stars-big big-rating');
        } else if (ratingAverage < 2.25) {
            setRating('two-stars-big big-rating');
        } else if (ratingAverage < 2.875) {
            setRating('two-half-stars-big big-rating');
        } else if (ratingAverage < 3.25) {
            setRating('three-stars-big big-rating');
        } else if (ratingAverage < 3.875) {
            setRating('three-half-stars-big big-rating');
        } else if (ratingAverage < 4.3) {
            setRating('four-stars-big big-rating');
        } else if (ratingAverage < 5 ){
            setRating('five-stars-big big-rating');
        }
    }, [reviews])

    const calculateRating = () => {
        let sum = 0;
        reviews?.map((review) => {
            sum += review.rating
        })
        let total = reviews?.length
        return sum / total
    }

    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        // dispatch get business
        dispatch(showBusiness(bizId))
    }, [dispatch, bizId])

    useEffect(() => {
        if (biz) {
            document.title = `${biz.name} - Yelp`;
        }
    }, [biz]);

    const handleReviewClick = (e) => {
        // e.preventDefault;
        const targetUrl = `/writeareview?bizId=${bizId}`;
        // navigate to the review page
        window.location.href = targetUrl;
    }

    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        const newScrollPosition = scrollPosition + scrollOffset;
        setScrollPosition(newScrollPosition);
        scrollContainerRef.current.scrollLeft = newScrollPosition;
    }

    return (
        <div>
           <div>
                <NavBar></NavBar>
           </div>
            <div id='photo-container'>
                <div id='scroll-buttons' >
                    <button className="scroll-left" onClick={() => handleScroll(-350)}>Left</button>
                    <button className="scroll-right" onClick={() => handleScroll(350)}>Right</button>
                </div>
                <div id='scroll-container' ref={scrollContainerRef}>
                        {biz?.photos?.map((photo) => (
                            <img src={photo} />
                        ))}
                        {biz?.photos?.map((photo) => (
                            <img src={photo} />
                        ))}
                 </div>
                    <div id="top-info">
                        <h1>{biz?.name}</h1>
                        <div class={rating}></div>
                        <ul>
                            <li>
                                Unclaimed
                            </li>
                            <li>
                                $$
                            </li>
                            <li>
                                tags
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Open/closed
                            </li>
                            <li className='hours'>
                                Hours updated 2 months ago
                            </li>
                           
                            <button>See Hours</button>
                            
                        </ul>
                    </div>
                   
                </div>
           <div id='business-container'>
                <div id='left-scroll'>
                    <div id="action-items">
                        <button className='red-button' onClick={handleReviewClick}>Write a Review</button>
                        <button>Add photo</button>
                        <button>Share</button>
                        <button>Save</button>
                    </div>
                    <div id='location-hours'>
                        <div id='location-left'>
                            <h2>Location & Hours</h2>
                            <div id='map'>
                                <map>

                                </map>
                            </div>
                            <div id='address-container'>
                                <ul id='address'>
                                    <li>
                                        {biz?.address.street}
                                    </li>
                                    <li>
                                        {biz?.address.city}, {biz?.address.state}
                                    </li>
                                    <li>
                                        {biz?.postalCode}
                                    </li>
                                </ul>
                                <button className="clear-button-outline nav-button">Get directions</button>
                            </div>
                        </div>
                        <div id='location-middle'>
                            <ul>
                                <li>
                                    Mon 
                                </li>
                                <li>
                                    Tue 
                                </li>
                                <li>
                                    Wed 
                                </li>
                                <li>
                                    Thu 
                                </li>
                                <li>
                                    Fri 
                                </li>
                                <li>
                                    Sat 
                                </li>
                                <li>
                                    Sun 
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    {biz?.hours.mon}
                                </li>
                                <li>
                                    {biz?.hours.tues}
                                </li>
                                <li>
                                    {biz?.hours.weds}
                                </li>
                                <li>
                                    {biz?.hours.thurs}
                                </li>
                                <li>
                                    {biz?.hours.fri}
                                </li>
                                <li>
                                    {biz?.hours.sat}
                                </li>
                                <li>
                                    {biz?.hours.sun}
                                </li>
                            </ul>
                            <ul id='closed-open'>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                            </ul>

                        </div>
                       
                    </div>
                    { biz?.about &&
                        <div id='about-container'>
                            <h2>About the Business</h2>
                            <p>{biz?.about}</p>
                        </div>
                    }
                    <div id='review-container'>
                        <h2>Reviews</h2>
                        <div id='rating-visualizer'>
                            <div>
                                <h2>Overall rating</h2>
                                <div class={rating}></div>
                                <div>
                                    
                                </div>
                            </div>
                            <ul>
                                <li>
                                    5 stars
                                </li>
                                <li>
                                    4 stars
                                </li>
                                <li>
                                    3 stars
                                </li>
                                <li>
                                    2 stars
                                </li>
                                <li>
                                    1 stars
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    {showReviews &&
                        <BusinessReviews currentUser={currentUser} reviews={reviews} users={users} />
                    }
                </div>
                <div id='right-scroll'>   
                    {biz?.phoneNum}
                </div>

           </div>
        </div>
    )
}

export default Business;