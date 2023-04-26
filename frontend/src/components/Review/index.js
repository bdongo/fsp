import { useEffect } from 'react';
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
    console.log(biz , "biz")
    console.log(bizId, "bizId")
    console.log(params, "params")

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
            <h1>{biz?.name}</h1>
        </>
    )
}

export default Review;