import { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './Review.css';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, showBusiness } from '../../store/businessPages';

const Review = () => {
    // const {bizId} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const bizId = parseInt(params.get('bizId'));
    const biz = useSelector(getBusiness(bizId));
    const [body, setBody] = useState('')

    useEffect(() => {
        dispatch(showBusiness(bizId));
    }, [dispatch, bizId]);

    useEffect(() => {
        if (biz) {
            document.title = `Write a Review - ${biz.name}`
        } else {
            document.title = `Write a Review`;
        }
    }, [biz]);

    return (
        <>
        <NavBar></NavBar>
        <div className='review-container'>
            <h1>{biz?.name}</h1>
            <form>
                <input type='text' 
                    placeholder='review goes here'
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                />
            </form>
        </div>
        </>
    )
}

export default Review;