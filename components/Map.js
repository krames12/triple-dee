import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from "../styles/Map.module.css"

const Map = ({ userLocation, updateLocation }) => {
  const [zoom, setZoom] = useState(11);
  mapboxgl.accessToken = process.env.MAPBOX_SECRET;

  useEffect(() => {
    // Geolocation Setup
    if( 'geolocation' in window.navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success
        ({coords}) => {
          // Attempt at fixing the restriction of needing to be in a useEffect
          // to access anything on the window, i.e. navigation, to set the user's
          // location as a default
          mapbox.jumpTo({ "center": [coords.longitude, coords.latitude] })

          updateLocation({
            lng: coords.longitude,
            lat: coords.latitude,
          })
        },

        // Error
        (error) => console.error(error)
      )

    }
    
    const mapbox = new mapboxgl.Map({
      'container': "map-container",
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [userLocation.lng, userLocation.lat],
      'zoom': zoom
    });

    mapbox.on('move', () => {
      updateLocation({
        lng: mapbox.getCenter().lng.toFixed(4),
        lat: mapbox.getCenter().lat.toFixed(4),
      })
      setZoom(mapbox.getZoom().toFixed(2))
    })
  }, []);

  return <div id="map-container" className={styles["map-container"]} />
};

export default Map;