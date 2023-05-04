import './Map.css';
import {useEffect, useRef, useState} from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Map = ({
    mapOptions = {},
    businesses,
    mapEventHandlers = {},
    markerEventHandlers = {},
    handleRating
    }) => {
    const [map, setMap] = useState(null);
    const markers = useRef({})
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

    let businessIds = []

    useEffect(() => {
        businesses?.forEach((business, idx) => {
            if (!markers[business?.id]) {
                // create new marker for business
                let marker = new window.google.maps.Marker({
                    position: business.location,
                    map: map,
                    strokeWeight: 2,
                    strokeColor: "#fff",
                    label: {
                       text: `${idx + 1}`,
                       color: '#fff'
                    }
                });
                
                
                // add info window for each business marker
                const contentString =
                    `<div class="tooltip-container">` +
                    `<img src=${business?.photos[1]} />` +
                    `<h1>${business?.name}</h1>` +
                    `<div class=${handleRating(business?.averageRating)}  />` +
                    `</div>`
            
                let infoWindow = new window.google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('mouseover', () => infoWindow.open(map, marker))
                marker.addListener('onClick', () => infoWindow.open(map, marker))
                // marker.addListener('mouseout', () => infoWindow.close());


                // add event handlers to each marker
                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(business));
                });


                // add marker to markers ref
                markers.current[business?.id] = marker
                businessIds.push(business?.id)
            };
        });
    }, [map, markers, businesses, markerEventHandlers])

    return (
            <div
                ref={mapRef}
            >
                Map
            </div>
    )

}

export default Map;