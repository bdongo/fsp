import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getAllBusinesses, indexBusiness, receiveAllBusiness } from '../../store/businessPages';
import csrfFetch from '../../store/csrf';
import './SearchBar.css'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryRef = useRef("");
    const [results, setResults] = useState(null);
    const businesses = useSelector(getAllBusinesses)
    const searchbarRef = useRef(null);
    const searchResultsRef = useRef(null);
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('query');
    const [query ,setQuery ] = useState();
    const [placeholder, setPlaceholder] = useState('Search for names or tags')
    
    const handleTyping = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query !== "") {
            const delaySearch = setTimeout(async () => {
                setResults(
                    businesses.filter(
                        business =>
                            business.name.toLowerCase().includes(query.toLowerCase()) ||
                            business.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
                    )
                );
            }, 400);

            return () => clearTimeout(delaySearch);
        } 
    }, [query]);

    useEffect(()=> {
        if (!!urlQuery) {
            setPlaceholder(urlQuery)
        } else {
            setPlaceholder('Search for names or tags')
        }
    }, urlQuery)

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query) {
            const targetUrl = `/search?query=${query}`;
            // navigate to the review page
            window.location.href = targetUrl;
        } else {
            setPlaceholder('Type something in to search first')
            const delayPLaceholder = setTimeout(() => {
                setPlaceholder('Search for names or tags')
            }, 3000);

            return () => clearTimeout(delayPLaceholder);
        }
        }

    const handleClickOutside = (e) => {
        if (
            searchbarRef.current &&
            !searchbarRef.current.contains(e.target) &&
            searchResultsRef.current &&
            !searchResultsRef.current.contains(e.target)
        ) {
            setResults(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setResults(null); // close the search results when URL changes
    }, [location]);

    return (
        <div id='searchbar' ref={searchbarRef}>
            <div className='searchbar-container'>
                {results &&
                    <ul className='search-results' ref={searchResultsRef}>
                        {results?.slice(0,6).map((business, idx) => (
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
                    placeholder={placeholder}
                    onChange={(e) => handleTyping(e)}
                />
                <div id='divider'/>
                <input placeholder='San Francisco, CA' readOnly/>
                <button
                    className='search-button'
                    onClick={e => handleSubmit(e)}
                ></button>
            </form>
           
        </div>   
    )
}

export default SearchBar