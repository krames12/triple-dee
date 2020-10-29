import {useState, useEffect} from 'react'
import * as axios from 'axios';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Map from '../components/Map/index'
import RestaurantList from '../components/RestaurantList/index'
import RestaurantsContext from "../components/RestaurantsContext"

export default function Home() {
  const [locationData, setLocationData] = useState({
    lng: -83.0671,
    lat: 42.3529,
    zoom: 12
  })
  const [restaurants, setRestaurants] = useState([])

  const updateRestaurantList = async (lng, lat) => {
    await axios.get(`/api/places?lng=${lng}&lat=${locationData.lat}&zoom=${locationData.zoom}`)
      .then( ({data}) => {
        setRestaurants(data);
      })
      .catch( error => console.error(error))
  }

  const handleSearchAreaClick = () => {
    updateRestaurantList(locationData.lng, locationData.lat)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <button 
          className="
            p-2 rounded
            bg-purple-600 text-white hover:bg-purple-800
            transition-all duration-200 ease-in-out
          " 
          onClick={() => handleSearchAreaClick()}
        >
          Refresh List
        </button>
        <RestaurantsContext.Provider values={{locationData, restaurants}}>
          <div className={styles["app-container"]}>
            <Map 
              userLocation={locationData} 
              locationUpdateHandler={setLocationData} 
              restaurantLocations={restaurants}
              updateRestaurantListHander={updateRestaurantList}
            />
            <RestaurantList restaurants={restaurants} />
          </div>
        </RestaurantsContext.Provider>
      </main>
    </div>
  )
}
