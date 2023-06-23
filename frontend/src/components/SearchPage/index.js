import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';
import { getAllBusinesses, searchBusinesses } from '../../store/businessPages';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from '../Map';
import { useState } from 'react';

const SearchPage = () => {
    const businesses = useSelector(getAllBusinesses);
    const location = useLocation();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const filterBusinesses = businesses.filter(business =>
            business.name.toLowerCase().includes(query.toLowerCase()) ||
            business.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(()=> {
        dispatch(searchBusinesses(query))
    }, [query])

    useEffect(() => {
        if (query) {
            document.title = `ylp - ${query}`
        } else {
            document.title = `ylp - Search`;
        }
    }, [query]);

    const ratingArr = {
        0.5: 'one-star-big big-rating',
        1: 'one-star-big big-rating',
        1.5: 'one-half-stars-big big-rating',
        2: 'two-stars-big big-rating',
        2.5: 'two-half-stars-big big-rating',
        3: 'three-stars-big big-rating',
        3.5: 'three-half-stars-big big-rating',
        4: 'four-stars-big big-rating',
        4.5: 'four-stars-big big-rating',
        5: 'five-stars-big big-rating'
    }

    const handleRating = (rating) => {
        const roundedRating = Math.floor(rating * 2) / 2;
        return ratingArr[roundedRating] || '';
    };

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

    if (businesses.length === 0 ){
        return (
            <div id='searchpage' >
                <h2 className='search-welcome'>Loading "{query}" results in San Francisco, California...</h2>
            </div>
        )
    }

    return(
        <div id='searchpage' > 
            {filterBusinesses && 
                <ul>
                    <h2 className='search-welcome'>All "{query}" results in San Francisco, California</h2>
                    {filterBusinesses?.map((business, idx) => ( 
                        <li key={idx}>
                            <Link className="search-page-item" to={`/biz/${business.id}`}>
                                <img src={business.photos[0]} />
                                <div className='info-container'>
                                    <h2>{idx + 1}. {business.name}</h2>
                                    <div className={`${handleRating(business.averageRating)}`} />
                                    <div className='row-three'>
                                        {business?.tags.map((tag, idx) =>
                                            <Link key={idx} 
                                                className='item-tags' 
                                                to={`/search?query=${tag}`}
                                                >{tag}</Link>
                                        )}
                                        <ul>
                                            <li>{pricingMap[business?.pricing]}</li>
                                            <li>{business.address.street}</li>
                                        </ul>
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
                        ratingArr={ratingArr}
                        handleRating={handleRating}
                        businesses={filterBusinesses} />
                </Wrapper>

            </div>
        </div>
    )
}
export default SearchPage;