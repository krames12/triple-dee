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
  })
  const [restaurants, setRestaurants] = useState(["bill's tavern"])

  useEffect(() => {

  }, [restaurants])

  return (
    <div className={styles.container}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <RestaurantsContext.Provider values={{locationData}}>
          <Map userLocation={locationData} updateLocation={setLocationData} />
          <RestaurantList restaurants={restaurants} />
        </RestaurantsContext.Provider>
      </main>
    </div>
  )
}
