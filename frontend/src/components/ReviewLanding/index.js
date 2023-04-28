import { Link } from 'react-router-dom/cjs/react-router-dom';
import './ReviewLanding.css';

const ReviewLanding = ({reviewDisplay}) => {
    

    return (
        <div className='landing-review-container'>
            <div>
                <h2>Recent Activity</h2>
            </div>
            <ul>
                {reviewDisplay?.slice(0, 3).map(biz =>
                    <li>
                        <Link className="link" to={`/biz/${biz.id}`}>
                            <div>
                                {biz.name}
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(3, 6).map(biz =>
                    <li>
                        <Link className="link" to={`/biz/${biz.id}`}>
                            <div>
                                {biz.name}
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
            <ul>
                {reviewDisplay?.slice(6, 9).map(biz =>
                    <li>
                        <Link className="link" to={`/biz/${biz.id}`}>
                            <div>
                                {biz.name}
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )

}

export default ReviewLanding;