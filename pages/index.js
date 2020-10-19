import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Map from '../components/Map'

export default function Home() {
  // @TODO uses this default state instead of location based state.
  // Something about useEffect happening AFTER render??
  const [userLocation, setUserLocation] = useState({
    lng: 5,
    lat: 34,
  })

  useEffect(() => {
    // Geolocation Setup
    if( 'geolocation' in window.navigator) {
      navigator.geolocation.getCurrentPosition(
        // Success
        ({coords}) => {
          setUserLocation({lng: coords.longitude, lat: coords.latitude})
        },

        // Error
        (error) => console.error(error)
      )
    }
  }, [userLocation])

  return (
    <div className={styles.container}>
      <Head>
        <title>Triple Dee</title>
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <Map userLocation={userLocation} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
