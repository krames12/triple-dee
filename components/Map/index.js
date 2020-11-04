import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

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

          updateRestaurantListHander(mapbox.getBounds())
        },

        // Error
        (error) => console.error(error)
      )

    } else {
      updateRestaurantListHander(mapbox.getBounds())
    }
    
    const mapbox = new mapboxgl.Map({
      'container': mapContainerRef.current,
      'style': 'mapbox://styles/mapbox/streets-v11',
      'center': [userLocation.lng, userLocation.lat],
      'zoom': userLocation.zoom
    })

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

  const createMapMarker = ([lng, lat], name) => {
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

  return (
    <div className="
        relative 
        h-full w-full
        md:w-3/5
      "
    >
      <div ref={mapContainerRef} className={`h-full w-full rounded-3xl`} />
      <button 
          className="
            absolute top-0 left-auto right-auto
            p-2 rounded z-10
            bg-purple-600 text-white hover:bg-purple-800
            transition-all duration-200 ease-in-out
          " 
          onClick={() => updateRestaurantListHander(mapObject.getBounds())}
        >
          Refresh List
        </button>
    </div>
  )
};

export default Map;