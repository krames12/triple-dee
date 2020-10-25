import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import mapboxgl from 'mapbox-gl';
import styles from "../styles/Map.module.css"

const Map = ({ userLocation }) => {
  const [lng, setLng] = useState(userLocation.lng);
  const [lat, setLat] = useState(userLocation.lat);
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

  // async function fetcher(path) {
  //   axios.get(path)
  //     .then( response => {
  //       console.log("axios response", response)
  //       return response.data;
  //     })
  //     .catch( error => {
  //       console.error(error)
  //     })
  // }

  // const placesKey = process.env.googlePlaces;
  // const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lng},${lat}&radius=1500&type=restaurant&key=${placesKey}`
  
  // const { data, error } = useSWR(placesUrl, fetcher)
  // error ? console.error(error) : console.log('ata',data);

  return <div id="map-container" className={styles["map-container"]} />
};

export default Map;