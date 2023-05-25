import { useEffect } from 'react';
import './StarTower.css';
import { useSelector } from 'react-redux';
import { getReviews } from '../../store/reviews';

const StarTower = () => {
    const reviews = useSelector(getReviews);

    useEffect(() => {
        const reviewsCopy = [...reviews]

        if (reviews.length != reviews) {
        const count = reviewsCopy.reduce((acc, { rating }) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, {});
        const largestNumber = Math.max(...Object.values(count));

        const fiveStars = (count["5"] / largestNumber) * 450
        document.getElementById("five-bar").style.width = `${fiveStars}px`;

        const fourStars = (count["4"] / largestNumber) * 450
        document.getElementById("four-bar").style.width = `${fourStars}px`;

        const threeStars = (count["3"] / largestNumber) * 450
        document.getElementById("three-bar").style.width = `${threeStars}px`;

        const twoStars = (count["2"] / largestNumber) * 450
        document.getElementById("two-bar").style.width = `${twoStars}px`;

        const oneStars = (count["1"] / largestNumber) * 450
        document.getElementById("one-bar").style.width = `${oneStars}px`;
    }
    }, [reviews])

    return (
        <ul>
            <li>
                5 stars
                <div className='ratings-bar'>
                    <div id='five-bar'></div>
                </div>
            </li>
            <li>
                4 stars
                <div className='ratings-bar'>
                    <div id='four-bar'></div>
                </div>
            </li>
            <li>
                3 stars
                <div className='ratings-bar'>
                    <div id='three-bar'></div>
                </div>
            </li>
            <li>
                2 stars
                <div className='ratings-bar'>
                    <div id='two-bar'></div>
                </div>
            </li>
            <li>
                1 stars
                <div className='ratings-bar'>
                    <div id='one-bar'></div>
                </div>
            </li>
        </ul>
    )
}

export default StarTower;