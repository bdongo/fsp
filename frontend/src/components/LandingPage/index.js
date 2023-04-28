import { useDispatch, useSelector } from 'react-redux'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'
import NavBar from '../NavBar'
import { getAllBusinesses, indexBusiness } from '../../store/businessPages'
import { getUsers } from '../../store/users'
import { getReviews } from '../../store/reviews'
import BusinessDisplay from '../BusinessDisplay'
import ReviewLanding from '../ReviewLanding'

const LandingPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers)
    const reviews = useSelector(getReviews)
    const currentUser = useSelector(getCurrentUser)
    const businesses = useSelector(getAllBusinesses)

    const shuffleDisplay = (array) => {
        const shuffledArray = [...array]; // Create a copy of the input array

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    };

    const businessDisplay = Array.from(new Set(shuffleDisplay(businesses))).slice(0, 9)
    const showBusiness = businesses.length !== 0;
    const reviewDisplay = Array.from(new Set(shuffleDisplay(reviews))).slice(0, 9)
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
            <div>
                <NavBar></NavBar>
            </div>
            </div>
           {showReviews &&
                <ReviewLanding reviewDisplay={reviewDisplay}/>
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
                        American(New)
                    </li>
                    <li>
                        Wine Bar
                    </li>
                    <li>
                        Pizza
                    </li>
                    <li>
                        another one
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;