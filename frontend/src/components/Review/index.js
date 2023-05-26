import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './Review.css';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, showBusiness } from '../../store/businessPages';
import { createPhotoReview, createReview, updateReview } from '../../store/reviews';
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
    const clickThruRating = parseInt(params.get('rating'))|| 0;
    const biz = useSelector(getBusiness(bizId));
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState('')
    const [businessId, setBusinessId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [rating, setRating] = useState(clickThruRating);
    const [photoFiles, setPhotoFiles] = useState([]);
    const [photoURLs, setPhotoURLs] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [hoverRating, setHoverRating] = useState(clickThruRating);
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


    const hoverStarArr = [
        'blank-star star-rating',
        'yellow-star star-rating',
        'yellow-orange-star star-rating',
        'orange-star star-rating',
        'red-orange-star star-rating',
        'red-star star-rating'
    ]

    const descArr = [
        'Select your rating',
        'Not good',
        "Could've been better",
        "OK",
        "Good",
        "Great"
    ]

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!rating) {
            setErrors(["To submit your review, please select a star rating for this business."]);
        } else if (!body) {
            setErrors(["To submit your review, please explain your rating to others."]);
        }   else if (!currentUser) {
                setShowLoginModal(true);
        } else {
            // dispatch(createReview({ body, businessId, authorId, rating }))
            //     .then(() => {
            //         history.push(`/biz/${businessId}`)
            //     })
            //     .catch(async (res) => {
            //         let data;
            //         try {
            //             // .clone() essentially allows you to read the response body twice
            //             data = await res.clone().json();
            //         } catch {
            //             data = await res.text(); // Will hit this case if, e.g., server is down
            //         }
            //         if (data?.errors) setErrors(data.errors);
            //         else if (data) setErrors([data]);
            //         else setErrors([res.statusText]);
            //     });
            const formData = new FormData();
            formData.append('review[body]', body);
            formData.append('review[businessId]', businessId);
            formData.append('review[authorId]', authorId);
            formData.append('review[rating]', rating);
            if (photoFiles.length !== 0){
                for (let i = 0; i < photoFiles.length;  i++) {
                    formData.append('review[photos][]', photoFiles[i]) 
                }
            }
            
            dispatch(createPhotoReview(formData))
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

    const fileHandler = (e) => {
        const files = e.target.files;
        setPhotoFiles(files)
        if (files) {
            if (files.length !== 0) {
                let filesLoaded = 0;
                const urls = []
                Array.from(files).forEach((file, idx) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        urls[idx] = fileReader.result;
                        if (++filesLoaded === files.length)
                            setPhotoURLs(urls)
                    }
                })
            }
        }
        else setPhotoURLs([])
    }
    console.log(photoURLs, "photosURL")
    console.log(photoFiles, "photofiles")
   

    if (!bizId && !reviewInfo) {
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
                        <i className={hoverRating >= 1 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star2'
                        onClick={() => setRating(2)}
                        onMouseEnter={() => setHoverRating(2)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                            <i className={hoverRating >= 2 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star3'
                        onClick={() => setRating(3)}
                        onMouseEnter={() => setHoverRating(3)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                            <i className={hoverRating >= 3 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star4'
                        onClick={() => setRating(4)}
                        onMouseEnter={() => setHoverRating(4)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                            <i className={hoverRating >= 4 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div
                        id='star5'
                        onClick={() => setRating(5)}
                        onMouseEnter={() => setHoverRating(5)}
                        onMouseLeave={() => setHoverRating(rating)}
                    >
                            <i className={hoverRating === 5 ? hoverStarArr[hoverRating] : 'blank-star star-rating'} />
                    </div>

                    <div>{descArr[hoverRating]}</div>
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

            <div className='file-container'>
                <h2>Attach Photos</h2>

                <div className='show-upload-modal'>
                    <input type='file'
                        onChange={fileHandler}
                        onDrop={fileHandler}
                        multiple
                    ></input>
                    {photoURLs?.map((photo, idx) => 
                        <img key={idx} src={photo} className='img-preview' />
                    )
                    }
                </div>
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