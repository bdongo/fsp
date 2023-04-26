import { useDispatch, useSelector } from 'react-redux'
import UserGreeting from '../UserGreeting'
import './LandingPage.css'
import { getCurrentUser, showCurrentUser } from '../../store/session'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { useEffect } from 'react'
import NavBar from '../NavBar'
import { getAllBusinesses, indexBusiness } from '../../store/businessPages'

const LandingPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser)
    const businesses = useSelector(getAllBusinesses)

    const shuffleBusinesses = (array) => {
        const shuffledArray = [...array]; // Create a copy of the input array

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    };

    const display = Array.from(new Set(shuffleBusinesses(businesses))).slice(0, 9)
    const showBusiness = businesses.length !== 0;

    useEffect(()=> {
        dispatch(indexBusiness())
    }, [dispatch])

    return (
        <div>

            <div id="image-container">
            <div>
                <NavBar></NavBar>
            </div>
            </div>
           { showBusiness &&
            <div className='landing-container'>
                <div>
                    <h2>Recommended Places</h2>
                </div>
                <ul>
                    { display?.slice(0,3).map(biz => 
                        <li>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {display?.slice(3,6).map(biz =>
                        <li>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {display?.slice(6,9).map(biz =>
                        <li>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
             </div>

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