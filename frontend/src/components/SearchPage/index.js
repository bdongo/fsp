import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';
import { getAllBusinesses, searchBusinesses } from '../../store/businessPages';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';

const SearchPage = () => {
    const businesses = useSelector(getAllBusinesses);
    const location = useLocation();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    

    console.log(query)

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

    return(
        <>
            {businesses && 
                <ul>
                    {businesses?.map((business, idx) => (
                        <li key={idx}>
                            <Link className="search-page-item" to={`/biz/${business.id}`}>
                                <img src={business.photos[0]} />
                                <div>
                                    <h2>{business.name}</h2>
                                    <p>{business.address.street}, {business.address.city}</p>
                                    <h2>*****</h2>
                                    <p>{business.about ? teaserText(business.about) : null} </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
export default SearchPage;