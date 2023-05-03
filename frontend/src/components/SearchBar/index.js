import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllBusinesses, receiveAllBusiness } from '../../store/businessPages';
import csrfFetch from '../../store/csrf';
import './SearchBar.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [query ,setQuery ] = useState();
    const queryRef = useRef("");
    const [businesses, setBusinesses] = useState(null);
    const searchbarRef = useRef(null);
    const searchResultsRef = useRef(null);
    
    const handleTyping = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query !== "") {
            const delaySearch = setTimeout(async () => {
                const res = await csrfFetch(`/api/business_pages?query=${query}`);
                if (res.ok) {
                    const data = await res.json();
                    const businessPages = Object.values(data.businesses)
                    setBusinesses(businessPages)
                }
            }, 500);

            return () => clearTimeout(delaySearch);
        }

        
    }, [query]);



    const handleSubmit = (e) => {
        e.preventDefault();
        const targetUrl = `/search?query=${query}`;
        // navigate to the review page
        window.location.href = targetUrl;
    }

    const handleClickOutside = (e) => {
        if (
            searchbarRef.current &&
            !searchbarRef.current.contains(e.target) &&
            searchResultsRef.current &&
            !searchResultsRef.current.contains(e.target)
        ) {
            setBusinesses(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setBusinesses(null); // close the search results when URL changes
    }, [location]);

    return (
        <div id='searchbar' ref={searchbarRef}>
            <div className='searchbar-container'>
                {businesses &&
                    <ul className='search-results' ref={searchResultsRef}>
                        {businesses?.slice(0,10).map((business, idx) => (
                            <li key={idx}>
                                <Link className="search-item" to={`/biz/${business.id}`}>
                                <img src={business.photos[0]} />
                                <div>
                                    <h3>{business.name}</h3>
                                    <small className='street-list'>{business.address.street}, {business.address.city}</small>
                                </div>
                                </Link>
                            </li>
                        ))}
                    </ul>}
            </div>
            <form>
   
                <input 
                    placeholder='Search for names or tags'
                    onChange={(e) => handleTyping(e)}
                />
                <div id='divider'/>
                <input placeholder='San Francisco, CA' readOnly/>
            </form>
            <button 
                className='search-button'
                onClick={e => handleSubmit(e)}
            >Q</button>
        </div>   
    )
}

export default SearchBar