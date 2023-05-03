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
                                    <h2>*****</h2>
                                    <p>{business.address.street}</p>
                                    
                                    <p>{business.about ? teaserText(business.about) : null} </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
            <div id='search-map'>
                <Wrapper>
                    <Map mapOptions={{
                        center: {
                            lat: 37.773972,
                            lng: -122.431297
                        }}} />
                </Wrapper>

            </div>
        </div>
    )
}
export default SearchPage;