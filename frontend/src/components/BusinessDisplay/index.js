import { useDispatch, useSelector } from 'react-redux';
import './BusinessDisplay.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const BusinessDisplay = ({businessDisplay}) => {


    return (
        <>
            <div className='landing-container'>
                <div>
                    <h2>Recommended Places</h2>
                </div>
                <ul>
                    {businessDisplay?.slice(0, 3).map((biz, idx) =>
                        <li key={idx}>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {businessDisplay?.slice(3, 6).map((biz, idx) =>
                        <li key={idx}>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul>
                    {businessDisplay?.slice(6, 9).map((biz,idx) =>
                        <li key={idx}>
                            <Link className="link" to={`/biz/${biz.id}`}>
                                <div>
                                    {biz.name}
                                </div>
                            </Link>
                        </li>
                    )}
                </ul>
        </div>   
    </>
    )
}

export default BusinessDisplay;