import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ userLocation }) => {
    const [mapState, setMapState] = useState({
        lng: userLocation.lng,
        lat: userLocation.lat,
        zoom: 2
    });
    mapboxgl.accessToken = process.env.mapboxSecret;
    useEffect(() => {
        const map = new mapboxgl.Map({
            'container': 'map-container',
            'style': 'mapbox://styles/mapbox/streets-v11',
            'center': [mapState.lng, mapState.lat],
            'zoom': mapState.zoom
        });
    }, []);

    return <div id="map-container" style={{height: '80vh', width: '80vw',}} />
};

export default Map;