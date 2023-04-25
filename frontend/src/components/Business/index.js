import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './Business.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { showBusiness } from '../../store/businessPages';
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

    useEffect(() => {
        // dispatch get business
        dispatch(showBusiness(bizId))
    }, [dispatch, bizId])


    return (
        <div>
           <div>
                <NavBar></NavBar>
           </div>
           <div id='business-container'>
                <div id='photo-container'>
                    
                </div>

           </div>
        </div>
    )
}

export default Business;