import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';
import { getAllBusinesses } from '../../store/businessPages';

const SearchPage = () => {
    const businesses = useSelector(getAllBusinesses);
    const dispatch = useDispatch();


    return(
        <>
            <h1>search page</h1>
        </>
    )
}
export default SearchPage;