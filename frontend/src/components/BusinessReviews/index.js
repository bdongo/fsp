import './BusinessReviews.css';

const BusinessReviews = ({reviews, users}) => {

    return (
        <ul className='businessreview-container'>
            {reviews?.map(review =>
                <li>
                    <h2>{users[review.authorId].fName} {users[review.authorId].lName}</h2>
                    <p>rating: {review.rating} </p>
                    {/* <Link className="link" to={`/biz/${review.businessId}`}>
                        <div>
                            {businesses[review.businessId].name}
                        </div>
                    </Link> */}

                    <p>{review.body}</p>
                </li>
            )}
        </ul>
    )
}

export default BusinessReviews;