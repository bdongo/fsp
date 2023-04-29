import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ReviewLanding.css';

const ReviewLanding = ({reviewDisplay, state}) => {
    const [_, users, businesses, __] = state

    const lastInitial = (lastName) => {
        let result = lastName.split('')[0]
        result += "."
        return result
    }

    const teaserText = (text) => {
        
        let result = text.split(' ')
        if (result.length < 15) {
            return text
        }
        result = result.slice(0, 15).join(' ')
        result += "..."
        return result
    }

    return (
        <div className='landing-review-container'>
            <div>
                <h2>Recent Activity</h2>
            </div>
            <ul>
                {reviewDisplay?.slice(0, 3).map((review, idx) =>
                    <li key={idx}> 
                        <h3>{users[review.authorId].fName} {lastInitial(users[review.authorId].lName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {businesses[review.businessId].name}
                                </h3>
                            </div>
                        </Link>
                        
                        <p className='review-blurb'>{teaserText(review.body)}</p>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(3, 6).map((review, idx) =>
                    <li key={idx}>
                        <h3>{users[review.authorId].fName} {lastInitial(users[review.authorId].lName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {businesses[review.businessId].name}
                                </h3>
                            </div>
                        </Link>

                        <p className='review-blurb'>{teaserText(review.body)}</p>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(6, 9).map((review, idx) =>
                    <li key={idx}>
                        <h3>{users[review.authorId].fName} {lastInitial(users[review.authorId].lName)}</h3>
                        <p>Wrote a review</p>
                        <Link className="link" to={`/biz/${review.businessId}`}>
                            <div>
                                <h3>
                                    {businesses[review.businessId].name}
                                </h3>
                            </div>
                        </Link>

                        <p className='review-blurb'>{teaserText(review.body)}</p>
                    </li>
                )}
            </ul>
        </div>
    )

}

export default ReviewLanding;