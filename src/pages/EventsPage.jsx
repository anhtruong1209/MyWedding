import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Events from '../components/Events'
import Footer from '../components/Footer'
import RSVPPopup from '../components/RSVPPopup'
import BackgroundAudio from '../components/BackgroundAudio'
import { loadScripts } from '../utils/loadScripts'

const EventsPage = () => {
  const [showRSVP, setShowRSVP] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    loadScripts().then(() => {
      setScriptsLoaded(true)
      setTimeout(() => {
        if (window.WOW) {
          new window.WOW().init()
        }
      }, 500)
    })
    window.scrollTo(0, 0)
  }, [])

  return (
    <div id="wrapper" className="homepage">
      <BackgroundAudio />
      <Header onRSVPClick={() => setShowRSVP(true)} />
      <div id="events" style={{ marginTop: '100px' }}>
        <Events />
      </div>
      <Footer />
      {showRSVP && <RSVPPopup onClose={() => setShowRSVP(false)} />}
    </div>
  )
}

export default EventsPage

