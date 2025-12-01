import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Quote from '../components/Quote'
import Footer from '../components/Footer'
import RSVPPopup from '../components/RSVPPopup'
import BackgroundAudio from '../components/BackgroundAudio'
import { loadScripts } from '../utils/loadScripts'

const StoryPage = () => {
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
      <div id="story" style={{ marginTop: '100px' }}>
        <Quote />
      </div>
      <Footer />
      {showRSVP && <RSVPPopup onClose={() => setShowRSVP(false)} />}
    </div>
  )
}

export default StoryPage

