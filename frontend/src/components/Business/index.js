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

const Business = () => {
    const dispatch = useDispatch();
    const {bizId} = useParams();
    const biz = useSelector(getBusiness(bizId));
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const [rating, setRating] = useState('zero-stars-big big-rating');
    const [showEditButton, setShowEditButton] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    console.log(showEditButton, "showEditbutton")
    
    useEffect(()=> {
        if (currentUser) {
            setShowEditButton(findAuthorId(reviews, currentUser))
        }
    }, [reviews, currentUser])

    const findAuthorId = (reviews, user) => {
        const authoredReview = reviews?.find(review => review.authorId === user?.id);
        if (authoredReview) {
            console.log(authoredReview)
            return authoredReview;
        } else {
            return null;
        }
    };
    

    
    const showReviews = reviews.length !== 0

    const pricingMap = {
        1: '$',
        2: '$$',
        3: '$$$',
        4: '$$$$'
    };

    useEffect(()=> {
        // const ratingAverage = calculateRating()
        const ratingAverage = biz?.averageRating
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
    }, [biz])

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
    useEffect(()=> {
        const count = reviews.reduce((acc, { rating }) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, {});
        const largestNumber = Math.max(...Object.values(count));

        const fiveStars = (count["5"] / largestNumber) * 450
        document.getElementById("five-bar").style.width = `${fiveStars}px`;

        const fourStars = (count["4"] / largestNumber) * 450
        document.getElementById("four-bar").style.width = `${fourStars}px`;

        const threeStars = (count["3"] / largestNumber) * 450
        document.getElementById("three-bar").style.width = `${threeStars}px`;

        const twoStars = (count["2"] / largestNumber) * 450
        document.getElementById("two-bar").style.width = `${twoStars}px`;

        const oneStars = (count["1"] / largestNumber) * 450
        document.getElementById("one-bar").style.width = `${oneStars}px`;

    }, [reviews])

    
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
                        <div className={rating}></div>
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
                        { !!showEditButton &&
                        <>
                            <button className='red-button' onClick={() => setShowEditModal(true)}>Edit your Review</button>
                                <button onClick={() => setShowEditModal(true)}>Add photo</button>
                            {showEditModal && 
                                <EditModal
                                    setShowEditModal={setShowEditModal}
                                    reviewInfo={showEditButton}
                                />
                            }
                        </>
                        }
                        { !showEditButton &&
                        <>
                            <button className='red-button' onClick={handleReviewClick}>Write a Review</button>
                            <button onClick={handleReviewClick}>Add photo</button>
                        </>
                        }
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
                                <div className={rating}></div>
                                <div>
                                    
                                </div>
                            </div>
                            <ul>
                                <li>
                                    5 stars
                                    <div className='ratings-bar'>
                                        <div id='five-bar'></div>
                                    </div>
                                </li>
                                <li>
                                    4 stars
                                    <div className='ratings-bar'>
                                        <div id='four-bar'></div>
                                    </div>
                                </li>
                                <li>
                                    3 stars
                                    <div className='ratings-bar'>
                                        <div id='three-bar'></div>
                                    </div>
                                </li>
                                <li>
                                    2 stars
                                    <div className='ratings-bar'>
                                        <div id='two-bar'></div>
                                    </div>
                                </li>
                                <li>
                                    1 stars
                                    <div className='ratings-bar'>
                                        <div id='one-bar'></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    {showReviews &&
                        <BusinessReviews 
                            currentUser={currentUser} 
                            reviews={reviews} 
                            showEditModal={showEditModal}
                            setShowEditModal={setShowEditModal}
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