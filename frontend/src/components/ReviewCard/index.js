import './ReviewCard.css';

const ReviewCard = ({business}) => {

    return (
        <div className='review-card'>
            <h3>{business.name}</h3>
            <p>Do you reccomend this business?</p>
        </div>
    )
}

export default ReviewCard;