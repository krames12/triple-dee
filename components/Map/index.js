import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from "./Map.module.scss"

const Map = ({ userLocation, locationUpdateHandler, restaurantLocations, updateRestaurantListHander }) => {
  const mapContainerRef = useRef(null);
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
            ...userLocation,
            lng: coords.longitude,
            lat: coords.latitude,
          })

          updateRestaurantListHander(coords.longitude, coords.latitude)
        },

        // Error
        (error) => console.error(error)
      )

    } else {
      updateRestaurantListHander(userLocation.lng, userLocation.lat)
    }
    
    const mapbox = new mapboxgl.Map({
      'container': mapContainerRef.current,
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [userLocation.lng, userLocation.lat],
      'zoom': userLocation.zoom
    })

    console.log(mapbox.getBounds())

    mapbox.on('move', () => {
      locationUpdateHandler({
        lng: mapbox.getCenter().lng.toFixed(6),
        lat: mapbox.getCenter().lat.toFixed(6),
        zoom: mapbox.getZoom().toFixed(3)
      })
    })

    mapbox.on('load', () => setMapObject(mapbox))

    return () => mapbox.remove()
  }, [])

  useEffect(() => {
    clearAllMarkers();
    if(restaurantLocations.length > 0) {
      const newMarkers = [];
      restaurantLocations.forEach( ({location, name}) => {
        const marker = createMapMarker(location, name)
        newMarkers.push(marker);
      })

      setMapMarkers(newMarkers);
    }
  }, [restaurantLocations, mapObject])

  const createMapMarker = ({lng, lat}, name) => {
    if(mapObject) {
      return new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup()
          .setHTML(`<h3>${name}</h3>`)
        )
        .addTo(mapObject);
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