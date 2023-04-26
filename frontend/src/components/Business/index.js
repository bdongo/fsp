import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
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
    }, []);

    return (
        <div>
           <div>
                <NavBar></NavBar>
           </div>
           <div id='business-container'>
                <div id='photo-container'>
                    <div id="top-info">
                        <h1>{biz?.name}</h1>
                        <div>stars</div>
                        <ul>
                            <li>
                                unclaimed
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
                            <li>
                                Hours updated 2 months ago
                            </li>
                            <li>
                                <button>See Hours</button>
                            </li>
                        </ul>
                    </div>
                    
                </div>
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
                            <map>

                            </map>
                            <div>
                                <ul>
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
                                <button>Get directions</button>
                            </div>
                        </div>
                        <div id='location-middle'>
                            <ul>
                                <li>
                                    Mon {biz?.hours.mon}
                                </li>
                                <li>
                                    Tue {biz?.hours.tues}
                                </li>
                                <li>
                                    Wed {biz?.hours.weds}
                                </li>
                                <li>
                                    Thu {biz?.hours.thurs}
                                </li>
                                <li>
                                    Fri {biz?.hours.fri}
                                </li>
                                <li>
                                    Sat {biz?.hours.sat}
                                </li>
                                <li>
                                    Sun {biz?.hours.sun}
                                </li>
                            </ul>
                        </div>
                        <div id='location-right'> 
                            <div>Closed/open status</div>
                        </div>
                    </div>
                    <div>
                        <h2>About the Business</h2>
                        <p>{biz?.about}</p>
                    </div>
                    <div id='review-container'>
                        <div>
                            rating visualizer
                        </div>
                        
                    </div>
                </div>
                <div id='right-scroll'>     
                </div>
           </div>
        </div>
    )
}

export default Business;