import { useEffect } from 'react';
import NavBar from '../NavBar';
import './Review.css';

const Review = () => {

    useEffect(() => {
        document.title = `Write a Review"`;
    }, []);

    return (
        <>
        <NavBar></NavBar>
        </>
    )
}

export default Review;