import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Business.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBusiness, showBusiness } from '../../store/businessPages';
import NavBar from '../NavBar';

// 1: {
//     id: 1,
//         name: "mcdonalds",
//         hours: {
//                  mon: "6:30am-10pm",
//                  tues: "6:30am-10pm",
//                  weds: "6:30am-10pm",
//                  thurs: "6:30am-10pm",
//                  fri: "6:30am-10pm",
//                  sat: "6:30am-10pm",
//                  sun: "6:30am-10pm"
//                 },
//         about: "american fast food",
//         phoneNum: " (408) 554-0883",
//         address: {
//                  street: "5122 Stevens Creek Blvd",
//                  city: "San Jose",
//                  state: "CA"
//                  },
//         postalCode: "95129",
//         location: { lat: -121° 56' 58.4664, lng: 37° 19' 22.6128 }
// }

const Business = () => {
    const dispatch = useDispatch();
    const {bizId} = useParams();
    const biz = useSelector(getBusiness(bizId))

    useEffect(() => {
        // dispatch get business
        dispatch(showBusiness(bizId))
    }, [dispatch, bizId])

    useEffect(() => {
        if (biz) {
            document.title = `${biz.name} - Yelp`;
        }
    }, [biz]);

    return (
        <div>
           <div>
                <NavBar></NavBar>
           </div>
                <div id='photo-container'>
                    <div id="top-info">
                        <h1>{biz?.name}</h1>
                        <div>*****</div>
                        <ul>
                            <li>
                                Unclaimed
                            </li>
                            <li>
                                $$
                            </li>
                            <li>
                                tags
                            </li>
                        </ul>
                        <ul>
                            <li>
                                Open/closed
                            </li>
                            <li className='hours'>
                                Hours updated 2 months ago
                            </li>
                           
                            <button>See Hours</button>
                            
                        </ul>
                    </div>
                    
                </div>
           <div id='business-container'>
                <div id='left-scroll'>
                    <div id="action-items">
                        <button className='red-button' bizId={bizId} >Write a Review</button>
                        <button>Add photo</button>
                        <button>Share</button>
                        <button>Save</button>
                    </div>
                    <div id='location-hours'>
                        <div id='location-left'>
                            <h2>Location & Hours</h2>
                            <div id='map'>
                                <map>

                                </map>
                            </div>
                            <div id='address-container'>
                                <ul id='address'>
                                    <li>
                                        {biz?.address.street}
                                    </li>
                                    <li>
                                        {biz?.address.city}, {biz?.address.state}
                                    </li>
                                    <li>
                                        {biz?.postalCode}
                                    </li>
                                </ul>
                                <button className="clear-button-outline nav-button">Get directions</button>
                            </div>
                        </div>
                        <div id='location-middle'>
                            <ul>
                                <li>
                                    Mon 
                                </li>
                                <li>
                                    Tue 
                                </li>
                                <li>
                                    Wed 
                                </li>
                                <li>
                                    Thu 
                                </li>
                                <li>
                                    Fri 
                                </li>
                                <li>
                                    Sat 
                                </li>
                                <li>
                                    Sun 
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    {biz?.hours.mon}
                                </li>
                                <li>
                                    {biz?.hours.tues}
                                </li>
                                <li>
                                    {biz?.hours.weds}
                                </li>
                                <li>
                                    {biz?.hours.thurs}
                                </li>
                                <li>
                                    {biz?.hours.fri}
                                </li>
                                <li>
                                    {biz?.hours.sat}
                                </li>
                                <li>
                                    {biz?.hours.sun}
                                </li>
                            </ul>
                            <ul id='closed-open'>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                                <li>
                                    Closed now/Open
                                </li>
                            </ul>

                        </div>
                       
                    </div>
                    { biz?.about &&
                        <div id='about-container'>
                            <h2>About the Business</h2>
                            <p>{biz?.about}</p>
                        </div>
                    }
                    <div id='review-container'>
                        <h2>Reviews</h2>
                        <div id='rating-visualizer'>
                            <div>
                                <h2>Overall rating</h2>
                                <div>
                                    *****
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                            <ul>
                                <li>
                                    5 stars
                                </li>
                                <li>
                                    4 stars
                                </li>
                                <li>
                                    3 stars
                                </li>
                                <li>
                                    2 stars
                                </li>
                                <li>
                                    1 stars
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div id='right-scroll'>   
                    {biz?.phoneNum}
                </div>
           </div>
        </div>
    )
}

export default Business;