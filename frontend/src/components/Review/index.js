import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './Review.css';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, showBusiness } from '../../store/businessPages';
import { createReview } from '../../store/reviews';
import { getCurrentUser } from '../../store/session';
import LoginModal from '../LoginModal';

const Review = () => {
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
    

    useEffect(() => {
        if (bizId) {
            dispatch(showBusiness(bizId));
            setBusinessId(bizId)
            setAuthorId(currentUser?.id)
        }
    }, [dispatch, bizId]);

    useEffect(() => {
        if (biz) {
            document.title = `Write a Review - ${biz.name}`
        } else {
            document.title = `Write a Review`;
        }
    }, [biz]);

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
    const copywrite = [
        "To submit your review, please select a star rating for this business.",
        "To submit your review, please explain your rating to others."
    ]

    return (
        <>
        {showLoginModal &&
            <LoginModal setShowLoginModal={setShowLoginModal}/>
        }
        <NavBar></NavBar>
        <div className='review-container'>
            <h1>{biz?.name}</h1>
            <form id='review'>
                <input 
                    type='radio'
                    value={1}
                    onClick={(e) => setRating(parseInt(e.target.value))}
                    checked={rating === 1}
                />
                <input
                    type='radio'
                    value={2}
                    onClick={(e) => setRating(parseInt(e.target.value))}
                    checked={rating === 2}
                />
                <input 
                    type='radio'
                    value={3}
                    onClick={(e) => setRating(parseInt(e.target.value))}
                    checked={rating === 3}
                />
                <input
                    type='radio'
                    value={4}
                    onClick={(e) => setRating(parseInt(e.target.value))}
                    checked={rating === 4}
                />
                <input
                    type='radio'
                    value={5}
                    onClick={(e) => setRating(parseInt(e.target.value))}
                    checked={rating === 5}
                />

                <input type='text-box' 
                    placeholder='review goes here'
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                />
            </form>
            <button 
                className='red-button button'
                onClick={submitHandler}
            >
                Post Review
            </button>
            <ul className="error-container">
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
        </>
    )
}

export default Review;