import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Map from '../components/Map'
import RestaurantList from '../components/RestaurantList'

export default function Home() {
  // @TODO uses this default state instead of location based state.
  // Something about useEffect happening AFTER render??
  const [userLocation, setUserLocation] = useState({
    lng: -83.0671,
    lat: 42.3529,
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <Map userLocation={userLocation} />
        <RestaurantList />
      </main>
    </div>
  )
}
