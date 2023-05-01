import './Map.css';
import {useEffect, useRef, useState} from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Map = ({mapOptions}) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    
    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: 37.773972,
                    lng: -122.431297
                }, // San Francisco coordinates
                zoom: 13,
                clickableIcons: false,
                ...mapOptions,
            }));
        }

        const marker = new window.google.maps.Marker({
            position: mapOptions.center,
            map: map
        })
    }, [mapRef, map, mapOptions]);



    return (
            <div
                ref={mapRef}
            >
                Map
            </div>
    )

}

export default Map;