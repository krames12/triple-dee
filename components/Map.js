import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from "../styles/Map.module.css"

const Map = ({ userLocation, locationUpdateHandler, restaurantLocations }) => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(12);
  const [mapObject, setMapObject] = useState(null)
  const [mapMarkers, setMapMarkers] = useState([]);

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

          locationUpdateHandler({
            lng: coords.longitude,
            lat: coords.latitude,
          })
        },

        // Error
        (error) => console.error(error)
      )

    }
    
    const mapbox = new mapboxgl.Map({
      'container': mapContainerRef.current,
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [userLocation.lng, userLocation.lat],
      'zoom': zoom
    })

    mapbox.on('move', () => {
      locationUpdateHandler({
        lng: mapbox.getCenter().lng.toFixed(4),
        lat: mapbox.getCenter().lat.toFixed(4),
      })
      setZoom(mapbox.getZoom().toFixed(2))
    })

    mapbox.on('load', () => setMapObject(mapbox))

    return () => mapbox.remove()
  }, [])

  useEffect(() => {
    clearAllMarkers();
    if(restaurantLocations.length > 0) {
      const newMarkers = [];
      restaurantLocations.forEach( ({location}) => {
        const marker = createMapMarker(location)
        newMarkers.push(marker);
      })

      setMapMarkers(newMarkers);
    }
  }, [restaurantLocations, mapObject])

  const createMapMarker = ({lng, lat}) => {
    if(mapObject) {
      return new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapObject);
    }
    else {
      return
    }
  }

  const clearAllMarkers = () => {
    mapMarkers.forEach( marker => marker && marker.remove())
    setMapMarkers([])
  }

  return <div ref={mapContainerRef} className={styles["map-container"]} />
};

export default Map;