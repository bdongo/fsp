import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Business.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getBusiness, showBusiness, showState } from '../../store/businessPages';
import NavBar from '../NavBar';
import BusinessReviews from '../BusinessReviews';
import { getReviews } from '../../store/reviews';
import { getCurrentUser } from '../../store/session';
import Map from '../Map';
import { Wrapper } from "@googlemaps/react-wrapper";
import EditModal from '../EditModal';
import StarTower from '../StarTower/StarTower';


const Business = () => {
    const dispatch = useDispatch();
    const {bizId} = useParams();
    const biz = useSelector(getBusiness(bizId));
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    
    const showReviews = reviews.length !== 0

    const pricingMap = {
        1: '$',
        2: '$$',
        3: '$$$',
        4: '$$$$'
    };

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

    const [currentRating, setCurrentRating] = useState(biz?.averageRating);

    // useEffect(()=> {
    //     setCurrentRating(handleRating(biz?.averageRating))
    // }, [reviews, biz])

    useEffect(() => {
        setCurrentRating(biz?.averageRating);
    }, [biz?.averageRating]);

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
        if (scrollPosition <= 0) {
            setScrollPosition(0);
        } 
        scrollContainerRef.current.scrollLeft = newScrollPosition;
    }

    const openGoogleMaps = () => {
        
        var address = `${biz?.address.street} ${biz?.address.city}, ${biz?.address.state}, ${biz?.postalCode}`;

        var url = "https://www.google.com/maps/search/" + encodeURIComponent(address);

        window.open(url, '_blank');
    }

    
    return (
        <>
        <div>
            <div id='photo-container'>
                {/* <div id='scroll-buttons' >
                    <button className="button-left" onClick={() => handleScroll(-350)}>{"<"}</button>
                    <button className="button-right" onClick={() => handleScroll(350)}>{">"}</button>
                </div> */}
                <div id='scroll-container' ref={scrollContainerRef}>
                        {biz?.photos?.map((photo, idx) => (
                            <img key={idx} src={photo} />
                        ))}
                        {biz?.photos?.map((photo, idx) => (
                            <img key={idx} src={photo} />
                        ))}
                 </div>
                    <div id="top-info"> 
                        <h1>{biz?.name}</h1>
                        {/* <div className={rating}></div> */}
                        <div className={handleRating(currentRating)}></div>
                        <ul>
                            <li>
                                Unclaimed
                            </li>
                            <li>
                                {pricingMap[biz?.pricing]}
                            </li>
                            <li>
                                {biz?.tags?.map((tag, index) => {
                                    if (biz.tags.length === 1) {
                                        return tag;
                                    } else {
                                        if (index === 0) {
                                            return tag;
                                        } else {
                                            return `, ${tag}`;
                                        }
                                    }
                                })}
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Open/closed
                            </li>
                            <li className='hours'>
                                Hours updated 2 months ago
                            </li>
                        </ul>
                    </div>
                   
                </div>
           <div id='business-container'>
                <div id='left-scroll'>
                    <div id="action-items">
                        <button className='red-button' onClick={handleReviewClick}>Write a Review</button>
                        <button onClick={handleReviewClick}>Add photo</button>
                    </div>
                    <div id='location-hours'>
                        <div id='location-left'>
                            <h2>Location & Hours</h2>
                            <div id='map'>
                                <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                                    <Map mapOptions={{ center: biz?.location }} />
                                </Wrapper>
                        
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
                                <button className="clear-button-outline nav-button"
                                    onClick={openGoogleMaps}
                                >Get directions</button>
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
                            {/* <ul id='closed-open'>
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
                            </ul> */}

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
                                <h4>Overall rating</h4>
                                <div className={handleRating(currentRating)}></div>
                                <div>
                                    
                                </div>
                            </div>
                            <StarTower
                                reviews={reviews}
                                />
                        </div>
                        
                    </div>
                    {showReviews &&
                        <BusinessReviews 
                            currentUser={currentUser} 
                            reviews={reviews} 
                            />
                    }
                </div>
                <div id='right-scroll'>   
                    {biz?.phoneNum}
                </div>

           </div>
        </div>
     </>
    )
}

export default Business;