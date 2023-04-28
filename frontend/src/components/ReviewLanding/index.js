import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ReviewLanding.css';

const ReviewLanding = ({reviewDisplay, state}) => {
    const [_, users, businesses, __] = state
    return (
        <div className='landing-review-container'>
            <div>
                <h2>Recent Activity</h2>
            </div>
            <ul>
                {reviewDisplay?.slice(0, 3).map((review, idx) =>
                    <li key={idx}> 
                        <h2>{users[review.authorId].fName} {users[review.authorId].lName}</h2>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                {businesses[review.businessId].name}
                            </div>
                        </Link>
                        
                        <p>{review.body}</p>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(3, 6).map((review, idx) =>
                    <li key={idx}>
                        <h2>{users[review.authorId].fName} {users[review.authorId].lName}</h2>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                {businesses[review.businessId].name}
                            </div>
                        </Link>

                        <p>{review.body}</p>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(6, 9).map((review, idx) =>
                    <li key={idx}>
                        <h2>{users[review.authorId].fName} {users[review.authorId].lName}</h2>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                {businesses[review.businessId].name}
                            </div>
                        </Link>

                        <p>{review.body}</p>
                    </li>
                )}
            </ul>
        </div>
    )

}

export default ReviewLanding;