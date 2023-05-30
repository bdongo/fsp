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
import AttachPhotosModal from '../AttachPhotosModal'

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
    const [oldPhotos, setOldPhotos] = useState([]);
    const [deleteIdxArr, setDeleteIdxArr] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showPhotoModal,setShowPhotoModal] = useState(false)
    const [hoverRating, setHoverRating] = useState(clickThruRating);
    const currentPath = location.pathname;

    useEffect(()=> {

        if(reviewInfo) {
            setBody(reviewInfo.body)
            setRating(reviewInfo.rating)
            setHoverRating(reviewInfo.rating)
            setBusinessId(reviewInfo.businessId)
            const photos = reviewInfo.photos || [];
            setOldPhotos(photos);
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
        if (photoFiles.length !== 0) {
            let filesLoaded = 0;
            const urls = []
            photoFiles.forEach((file, idx) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    urls[idx] = fileReader.result;
                    if (++filesLoaded === photoFiles.length)
                        setPhotoURLs(urls)
                }
            })
        } else {
            setPhotoURLs([])
        }
    }, [photoFiles])

    const showUpload = photoURLs?.length === 0 && oldPhotos?.length === 0




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
            
            dispatch(createReview(formData))
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
            const formData = new FormData();
            formData.append('review[body]', body);
            formData.append('review[businessId]', businessId);
            formData.append('review[authorId]', authorId);
            formData.append('review[rating]', rating);
            if (photoFiles.length !== 0) {
                for (let i = 0; i < photoFiles.length; i++) {
                    formData.append('review[photos][]', photoFiles[i])
                }
            }

            if (deleteIdxArr.length !== 0) {
                deleteIdxArr.forEach(num => {
                    formData.append('review[removePictureIdx][]', num);
                })
            }

            dispatch(updateReview(reviewInfo.id, formData))
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

    const deleteImg = (idx) => {
        const updatedPhotoFiles = [...photoFiles];
        updatedPhotoFiles.splice(idx, 1); 
        setPhotoFiles(updatedPhotoFiles)
    }
    const deleteOldImg = (idx, photo) => {
        const updatedPhotoFiles = [...oldPhotos];
        updatedPhotoFiles.splice(idx, 1); 
        setOldPhotos(updatedPhotoFiles);
        const backendIdx = reviewInfo.photos.indexOf(photo)
        setDeleteIdxArr([...deleteIdxArr, backendIdx])
    }

    console.log(photoFiles, "photoFiles")
    console.log(photoURLs, "photoURLs")
    console.log(oldPhotos, "oldPhotos")
    console.log(deleteIdxArr, "deleteidxarr")
   

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
        {showPhotoModal &&
            <AttachPhotosModal
               photoFiles={photoFiles} 
               setPhotoFiles={setPhotoFiles}
               setShowPhotoModal={setShowPhotoModal}
               setErrors={setErrors}
           />
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
                    {errors.map((error, idx) => <li key={idx}>{error.messages}</li>)}
                    {error}
                </ul>

            </div>

            <div className='file-container'>
                <h2>Attach Photos</h2>

                {showUpload &&
                    <div className='show-upload-modal-placeholder'
                        onClick={()=> setShowPhotoModal(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(195, 195, 195)" className="bi bi-camera" viewBox="0 0 16 16">
                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                    </div>
                }
                {!showUpload &&
                    <div className='show-uploaded-container'>
                        <div
                            onClick={() => setShowPhotoModal(true)}
                            className='attach-photos-button'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(195, 195, 195)" className="bi bi-camera" viewBox="0 0 16 16">
                                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg>
                        </div>
                        {oldPhotos?.map((photo, idx) =>
                            <div key={idx} className='img-preview-container'>
                                <img src={photo} className='img-preview' />
                                <div className='delete-img'
                                    onClick={() => deleteOldImg(idx, photo)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </div>
                            </div>
                        )
                        }
                        {photoURLs?.map((photo, idx) => 
                            <div key={idx} className='img-preview-container'>
                                <img  src={photo} className='img-preview' />
                                <div className='delete-img'
                                    onClick={()=>deleteImg(idx)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </div>
                            </div>
                        )
                        }
                    </div>
                }
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