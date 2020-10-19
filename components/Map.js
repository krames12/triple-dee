import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ userLocation }) => {
  const [mapState, setMapState] = useState({
    lng: userLocation.lng,
    lat: userLocation.lat,
    zoom: 12
  });
  mapboxgl.accessToken = process.env.mapboxSecret;
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      'container': 'map-container',
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [mapState.lng, mapState.lat],
      'zoom': mapState.zoom
    });

    map.on('move', () => {
      console.log('moving the map');
      setMapState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      })
    })
  }, []);

  return <div id="map-container" style={{height: '80vh', width: '80vw',}} />
};

export default Map;