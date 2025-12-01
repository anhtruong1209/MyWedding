import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import AboutPage from './pages/AboutPage'
import StoryPage from './pages/StoryPage'
import EventsPage from './pages/EventsPage'
import GalleryPage from './pages/GalleryPage'
import { loadScripts } from './utils/loadScripts'

function HomePage() {
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/cau-chuyen" element={<StoryPage />} />
        <Route path="/su-kien" element={<EventsPage />} />
        <Route path="/bo-suu-tap" element={<GalleryPage />} />
      </Routes>
    </Router>
  )
}

export default App

