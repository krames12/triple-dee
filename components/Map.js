import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ userLocation }) => {
  const [lng, setLng] = useState(userLocation.lng);
  const [lat, setLat] = useState(userLocation.lat);
  const [zoom, setZoom] = useState(11);
  mapboxgl.accessToken = process.env.mapboxSecret;

  useEffect(() => {
    // Geolocation Setup
    if( 'geolocation' in window.navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success
        ({coords}) => {
          setLng(coords.longitude)
          setLat(coords.latitude)
        },

        // Error
        (error) => console.error(error)
      )

    }
    
    const mapbox = new mapboxgl.Map({
      'container': "map-container",
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [lng, lat],
      'zoom': zoom
    });

    mapbox.on('move', () => {
      console.log('moving the map');
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    })
  }, []);

  // Figure out how the hell to get this to work
  // useEffect(() => {
  //   mapbox.jumpTo({ "center": [lng, lat] })
  // }, [lng, lat, zoom])

  return <div id="map-container" style={{height: '80vh', width: '80vw',}} />
};

export default Map;