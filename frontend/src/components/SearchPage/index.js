import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';
import { getAllBusinesses, searchBusinesses } from '../../store/businessPages';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../Map';

const SearchPage = () => {
    const businesses = useSelector(getAllBusinesses);
    const location = useLocation();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    useEffect(()=> {
        dispatch(searchBusinesses(query))
    }, [query])

    useEffect(()=> {

    }, [businesses])

    const handleRating = (ratingAverage) => {
        if (ratingAverage < 1.25) {
            return 'one-star-big big-rating';
        } else if (ratingAverage < 1.875) {
            return 'one-half-stars-big big-rating';
        } else if (ratingAverage < 2.25) {
            return 'two-stars-big big-rating';
        } else if (ratingAverage < 2.875) {
            return 'two-half-stars-big big-rating';
        } else if (ratingAverage < 3.25) {
            return 'three-stars-big big-rating';
        } else if (ratingAverage < 3.875) {
            return 'three-half-stars-big big-rating';
        } else if (ratingAverage < 4.3) {
            return 'four-stars-big big-rating';
        } else if (ratingAverage < 5) {
            return 'five-stars-big big-rating';
        }
    }

    const teaserText = (text) => {

        let result = text.split(' ')
        if (result.length < 15) {
            return text
        }
        result = result.slice(0, 25).join(' ')
        result += "..."
        return result
    }

    useEffect(()=> {
        document.getElementById('header').classList.add("sticky")
    }, [])
    
    const pricingMap = {
        1: '$',
        2: '$$',
        3: '$$$',
        4: '$$$$'
    };

    return(
        <div id='searchpage' >
            {businesses && 
                <ul>
                    <h2>All "{query}" results in San Francisco, California</h2>
                    {businesses?.map((business, idx) => ( 
                        <li key={idx}>
                            <Link className="search-page-item" to={`/biz/${business.id}`}>
                                <img src={business.photos[0]} />
                                <div>
                                    <h2>{idx + 1}. {business.name}</h2>
                                    <div className={`${handleRating(business.averageRating)}`} />
                                    <ul>
                                        {business?.tags.map(tag =>
                                            <Link to={`/search?query=${tag}`} >{tag}</Link>
                                        )}
                                    </ul>
                                    <div>
                                        <p>{pricingMap[business?.pricing]}</p>
                                        <p>{business.address.street}</p>
                                    </div>
                                    
                                    <p>{business.about ? teaserText(business.about) : null} </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
            <div id='search-map'>
                <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                    <Map
                        handleRating={handleRating}
                        businesses={businesses} />
                </Wrapper>

            </div>
        </div>
    )
}
export default SearchPage;