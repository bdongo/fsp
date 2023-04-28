import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './Review.css';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, showBusiness } from '../../store/businessPages';
import { createReview } from '../../store/reviews';
import { getCurrentUser } from '../../store/session';

const Review = () => {
    // const {bizId} = useParams();
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
    const [authorId, setAuthorId] = useState("");

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

    const submitHandler = (e) => {
        e.preventDefault();
        if (currentUser) {
            setAuthorId(currentUser.id)
            dispatch(createReview({ body, businessId, authorId }))
                .then(() => {
                    history.pushState(`/biz/${businessId}`)
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
        } else {
            console.log("sign in!")
        }   
    }

    return (
        <>
        <NavBar></NavBar>
        <div className='review-container'>
            <h1>{biz?.name}</h1>
            <form id='review'>
                <input type='text' 
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