import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from "../styles/Map.module.css"

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
      setLng(mapbox.getCenter().lng.toFixed(4))
      setLat(mapbox.getCenter().lat.toFixed(4))
      setZoom(mapbox.getZoom().toFixed(2))
    })
  }, []);

  // Figure out how the hell to get this to work
  // useEffect(() => {
  //   mapbox.jumpTo({ "center": [lng, lat] })
  // }, [lng, lat, zoom])

  return <div id="map-container" className={styles["map-container"]} />
};

export default Map;