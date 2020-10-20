import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ userLocation }) => {
  const [lng, setLng] = useState(userLocation.lng);
  const [lat, setLat] = useState(userLocation.lat);
  const [zoom, setZoom] = useState(11);
  mapboxgl.accessToken = process.env.mapboxSecret;

  useEffect(() => {
    const map = new mapboxgl.Map({
      'container': 'map-container',
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [lng, lat],
      'zoom': zoom
    });

    map.on('move', () => {
      console.log('moving the map');
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    })
  }, []);

  return <div id="map-container" style={{height: '80vh', width: '80vw',}} />
};

export default Map;