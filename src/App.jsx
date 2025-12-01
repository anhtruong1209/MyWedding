import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Couple from './components/Couple'
import Quote from './components/Quote'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Prize from './components/Prize'
import Footer from './components/Footer'
import RSVPPopup from './components/RSVPPopup'
import BackgroundAudio from './components/BackgroundAudio'
import { loadScripts } from './utils/loadScripts'

function App() {
  const [showRSVP, setShowRSVP] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    // Load external scripts
    loadScripts().then(() => {
      setScriptsLoaded(true)
      
      // Initialize WOW.js after scripts are loaded
      setTimeout(() => {
        if (window.WOW) {
          new window.WOW().init()
        }
      }, 500)
    }).catch((error) => {
      console.error('Error loading scripts:', error)
      // Continue even if scripts fail to load
      setScriptsLoaded(true)
    })
  }, [])

  return (
    <div id="wrapper" className="homepage">
      <BackgroundAudio />
      <Header onRSVPClick={() => setShowRSVP(true)} />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <Couple />
      </div>
      <div id="story">
        <Quote />
      </div>
      <div id="events">
        <Events />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <div id="prize">
        <Prize />
      </div>
      <Footer />
      {showRSVP && <RSVPPopup onClose={() => setShowRSVP(false)} />}
    </div>
  )
}

export default App

