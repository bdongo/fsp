import { useDispatch, useSelector } from 'react-redux'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'
import NavBar from '../NavBar'
import { getAllBusinesses, indexBusiness, showState } from '../../store/businessPages'
import { getUsers } from '../../store/users'
import { getReviews } from '../../store/reviews'
import BusinessDisplay from '../BusinessDisplay'
import ReviewLanding from '../ReviewLanding'
import slide1 from '../../assets/liho1.jpeg'
import slide2 from '../../assets/tony.jpeg'
import slide3 from '../../assets/unwin4.jpeg'
import { useState } from 'react'

const LandingPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const businesses = useSelector(getAllBusinesses);
    const state = useSelector(showState);
    const [slideImage, setSlideImage] = useState(0);
    const [slideTransition, setSlideTransition] = useState(false);

    const shuffleDisplay = (array) => {
        const shuffledArray = [...array]; // Create a copy of the input array

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    };

    const businessDisplay = Array.from(new Set(shuffleDisplay(businesses)))
    const showBusiness = businesses.length !== 0;
    const reviewDisplay = Array.from(new Set(shuffleDisplay(reviews)))
    const showReviews = reviews.length !== 0;

    useEffect(()=> {
        dispatch(indexBusiness())
    }, [dispatch])

    useEffect(() => {
        document.title = `Yelp`;
    }, []);

    const slides = [slide1, slide2, slide3]

    useEffect(()=> {
        const slideShow = setInterval(() => {
            setSlideTransition(true);

            setTimeout(() => {
                setSlideImage((slideImage + 1) % slides.length);
                setSlideTransition(false);
            }, 250)
        }, 7000)
        return () => clearInterval(slideShow)
    }, [slideImage])

    return (
        <div>

            <div id="image-container">
            <img 
                src={slides[slideImage]}
                className={`slideshow-image ${slideTransition ? 'hidden' : ''}`}
            />
            </div>
           {showReviews &&
                <ReviewLanding reviewDisplay={reviewDisplay} state={state}/>
            }
            { showBusiness && 
                <BusinessDisplay businessDisplay={businessDisplay}/>
            }
            <div className='landing-container'>
                <div>
                    <h2>Categories</h2>
                </div>
                <ul>
                    <li>
                        <h2 className='icon-title'>
                            American(New)
                        </h2>
                    </li>
                    <li>
                        <h2 className='icon-title'>
                            Wine Bar
                        </h2> 
                    </li>
                    <li>
                        <h2 className='icon-title'>
                            Pizza
                        </h2> 
                    </li>
                    <li>
                        <h2 className='icon-title'>
                            Another one
                        </h2> 
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;