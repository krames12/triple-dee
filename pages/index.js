import {useState, useEffect} from 'react'
import * as axios from 'axios';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Map from '../components/Map'
import RestaurantList from '../components/RestaurantList'
import RestaurantsContext from "../components/RestaurantsContext"

export default function Home() {
  const [locationData, setLocationData] = useState({
    lng: -83.0671,
    lat: 42.3529,
    zoom: 12
  })
  const [restaurants, setRestaurants] = useState([])

  const updateRestaurantList = async () => {
    await axios.get(`/api/places?lng=${locationData.lng}&lat=${locationData.lat}&zoom=${locationData.zoom}`)
      .then( ({data}) => {
        setRestaurants(data);
      })
      .catch( error => console.error(error))
  }

  const handleSearchAreaClick = () => {
    updateRestaurantList()
  }

  useEffect(() => {
    updateRestaurantList()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <button className={styles["search-area-button"]} onClick={() => handleSearchAreaClick()}>Refresh List</button>
        <RestaurantsContext.Provider values={{locationData, restaurants}}>
          <div className={styles["app-container"]}>
            <Map 
              userLocation={locationData} 
              locationUpdateHandler={setLocationData} 
              restaurantLocations={restaurants}
            />
            <RestaurantList restaurants={restaurants} />
          </div>
        </RestaurantsContext.Provider>
      </main>
    </div>
  )
}
