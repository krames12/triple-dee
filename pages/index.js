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
    zoom: 11
  })
  const [restaurants, setRestaurants] = useState([])

  const updateRestaurantList = async (mapBounds) => {
    /*
      _sw: lng, lat
      _ne: lng, lat
      NESW

      Top: _ne.lng
      Right: _ne.lat
      South: _sw.lng
      West: _sw.lat
    */

    await axios.get(`/api/db/restaurants?north=${mapBounds._ne.lng}&east=${mapBounds._ne.lat}&south=${mapBounds._sw.lng}&west=${mapBounds._sw.lat}`)
      .then( ({data}) => {
        setRestaurants(data.allRestaurants);
      })
      .catch( error => console.error(error))
  }

  return (
    <div className={`${styles.container} h-screen bg-purple-100`}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={`${styles.main}`}>
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
