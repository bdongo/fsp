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
import ImageSlides from '../ImageSlides'

const LandingPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers);
    const reviews = useSelector(getReviews);
    const currentUser = useSelector(getCurrentUser);
    const businesses = useSelector(getAllBusinesses);
    const state = useSelector(showState);


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

    return (
        <div>

            <div id="image-container">
                <ImageSlides/>
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
                        <Link className="link icon-container" to="/search?query=american(new)">
                        <h2 className='icon-title'>
                            American(New)
                        </h2>
                        </Link>
                    </li>
                    <li>
                        <Link className="link icon-container" to="/search?query=wine%20bar">
                        <h2 className='icon-title'>
                            Wine Bar
                        </h2> 
                        </Link>
                    </li>
                    <li>
                        <Link className="link icon-container" to="/search?query=pizza">
                        <h2 className='icon-title'>
                            Pizza
                        </h2> 
                        </Link>
                    </li>
                    <li>
                        <Link className="link icon-container" to="/search?query=fast%20food">
                        <h2 className='icon-title'>
                            Fast Food
                        </h2> 
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;