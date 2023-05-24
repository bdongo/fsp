import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './Review.css';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, showBusiness } from '../../store/businessPages';
import { createReview, updateReview } from '../../store/reviews';
import { getCurrentUser } from '../../store/session';
import LoginModal from '../LoginModal';
import SearchBar from '../SearchBar';
import SuggestedReviews from '../SuggestedReviews';

const Review = ({reviewInfo, setShowEditModal, error}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const currentUser = useSelector(getCurrentUser)
    const bizId = parseInt(params.get('bizId'));
    const biz = useSelector(getBusiness(bizId));
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState('')
    const [businessId, setBusinessId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [rating, setRating] = useState(null)
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [hoverStar, setHoverStar] = useState('blank-star star-rating')
    const [hoverRating, setHoverRating] = useState(0);
    const [desc, setDesc] = useState('Select your rating')
    const currentPath = location.pathname;

    useEffect(()=> {

        if(reviewInfo) {
            setBody(reviewInfo.body)
            setRating(reviewInfo.rating)
            setHoverRating(reviewInfo.rating)
            setBusinessId(reviewInfo.businessId)
        }

    }, [reviewInfo])

    useEffect(() => {
        if (bizId) {
            dispatch(showBusiness(bizId));
            setBusinessId(bizId)
        }
    }, [dispatch, bizId]);

    useEffect(() => {
        if (biz) {
            document.title = `Write a Review - ${biz.name}`
        } else {
            document.title = `Write a Review`;
        }
    }, [biz]);

    useEffect(()=> {
        if (currentUser) {
            setAuthorId(currentUser?.id)
        }
    }, [currentUser])

    useEffect(()=> {
        if (hoverRating === 1) {
            setHoverStar('yellow-star star-rating')
            setDesc('Not good')
        } else if (hoverRating === 2) {
            setHoverStar('yellow-orange-star star-rating')
            setDesc("Could've been better")
        } else if (hoverRating === 3) {
            setHoverStar('orange-star star-rating')
            setDesc("OK")
        } else if (hoverRating === 4) {
            setHoverStar('red-orange-star star-rating')
            setDesc("Good")
        } else if (hoverRating === 5) {
            setHoverStar('red-star star-rating')
            setDesc("Great")
        } else {
            setHoverStar('blank-star star-rating')
            setDesc('Select your rating')
        }
    }, [hoverRating])

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!rating) {
            setErrors(["To submit your review, please select a star rating for this business."]);
        } else if (!body) {
            setErrors(["To submit your review, please explain your rating to others."]);
        }   else if (!currentUser) {
                setShowLoginModal(true);
        } else {
            dispatch(createReview({ body, businessId, authorId, rating }))
                .then(() => {
                    history.push(`/biz/${businessId}`)
                })
                .catch(async (res) => {
                    let data;
                    try {
                        // .clone() essentially allows you to read the response body twice
                        data = await res.clone().json();
                    } catch {
                        data = await res.text(); // Will hit this case if, e.g., server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });
        }   
    }

    const updateHandler = (e) => {
        e.preventDefault();

        if (!rating) {
            setErrors(["To submit your review, please select a star rating for this business."]);
        } else if (!body) {
            setErrors(["To submit your review, please explain your rating to others."]);
        } else {
            dispatch(updateReview({ id: reviewInfo.id, body, businessId, authorId, rating }))
                .then(() => {
                    setShowEditModal(false)
                })
                .catch(async (res) => {
                    let data;
                    try {
                        // .clone() essentially allows you to read the response body twice
                        data = await res.clone().json();
                    } catch {
                        data = await res.text(); // Will hit this case if, e.g., server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });
        }
    }

    if (!bizId) {
        return (
            <SuggestedReviews/>
        )
    }

    return (
        <>
        {showLoginModal &&
            <LoginModal setShowLoginModal={setShowLoginModal}/>
        }
        <div className='review-container'>
            <h1>{biz?.name || reviewInfo?.businessName }</h1>
            <div id='review'>
                <div id='star-container'>
                    <div
                        id='star1'
                        onClick={() => setRating(1)}
                        onMouseEnter={() => setHoverRating(1)}
                        onMouseLeave={()=>setHoverRating(rating)}
                    >
                        <i className={hoverRating >= 1 ? hoverStar : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star2'
                        onClick={() => setRating(2)}
                        onMouseEnter={() => setHoverRating(2)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                        <i className={hoverRating >= 2 ? hoverStar : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star3'
                        onClick={() => setRating(3)}
                        onMouseEnter={() => setHoverRating(3)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                        <i className={hoverRating >= 3 ? hoverStar : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star4'
                        onClick={() => setRating(4)}
                        onMouseEnter={() => setHoverRating(4)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                        <i className={hoverRating >= 4 ? hoverStar : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star5'
                        onClick={() => setRating(5)}
                        onMouseEnter={() => setHoverRating(5)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                        <i className={hoverRating === 5 ? hoverStar : 'blank-star star-rating'} />
                    </div>

                    <div>{desc}</div>
                </div>

                <textarea
                    className='textbox'
                    type='text-box' 
                    placeholder= "I had an incredible experience at this place. The service was impeccable, and the food was absolutely amazing!"
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                />

                <ul className="error-container">
                    {errors.map(error => <li key={error}>{error}</li>)}
                    {error}
                </ul>

            </div>
            {currentPath.startsWith('/writeareview') &&
            <button 
                className='red-button button'
                onClick={submitHandler}
            >
                Post Review
            </button>
            }
            {currentPath.startsWith('/biz/') &&
            <button
                className='red-button button'
                onClick={updateHandler}
            >
                Edit Review
            </button>
            }
        </div>
        </>
    )
}

export default Review;