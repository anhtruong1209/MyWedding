import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

const Hero = () => {
  const sliderRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show content after mount
    setIsVisible(true)

    // Initialize Owl Carousel for slider
    const initSlider = () => {
      if (window.jQuery && window.jQuery.fn.owlCarousel && sliderRef.current) {
        const $slider = window.jQuery(sliderRef.current)
        $slider.owlCarousel({
          items: 1,
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          nav: true,
          dots: false,
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          smartSpeed: 1000,
        })
      } else {
        // Retry if jQuery not ready
        setTimeout(initSlider, 100)
      }
    }
    
    initSlider()
  }, [])

  const sliderImages = [
    '/images/slider/1.jpg',
    '/images/slider/2.jpg',
    '/images/slider/3.jpg',
  ]

  return (
    <section
      id="section-hero"
      className="full-height relative z1 owl-slide-wrapper no-top no-bottom text-light"
    >
      <div className="owl-slider-nav">
        <div className="next"></div>
        <div className="prev"></div>
      </div>

      <div 
        className="center-y fadeScroll relative" 
        style={{ 
          zIndex: 100, 
          position: 'relative',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                <div className="spacer-single"></div>
                <div 
                  className="col-md-5 text-right text-center-sm relative" 
                  style={{ 
                    paddingRight: '15px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end', 
                    zIndex: 1000, 
                    position: 'relative',
                    animation: isVisible ? 'fadeInLeft 1.5s ease-out' : 'none'
                  }}
                >
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      margin: 0,
                      textAlign: 'right',
                      color: '#d4af37',
                      fontSize: 'clamp(36px, 6vw, 72px)',
                      fontFamily: "'Allura', cursive",
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(212, 175, 55, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 700,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '2px',
                    }}
                  >
                    Lê Thị Ngọc Minh
                  </h2>
                </div>
                <div 
                  className="col-md-2 text-center" 
                  style={{ 
                    padding: '0 15px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1000, 
                    position: 'relative',
                    animation: isVisible ? 'zoomIn 1.5s ease-out 0.5s, pulse 2s ease-in-out infinite 2s' : 'none',
                    animationFillMode: 'both'
                  }}
                >
                  <span 
                    className="deco-big beating-heart" 
                    style={{
                      display: 'inline-block',
                      color: '#d4af37',
                      fontSize: 'clamp(60px, 10vw, 120px)',
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(212, 175, 55, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 1001,
                      position: 'relative',
                      fontFamily: "'Allura', cursive",
                    }}
                  >
                    &amp;
                  </span>
                </div>
                <div 
                  className="col-md-5 text-left text-center-sm relative" 
                  style={{ 
                    paddingLeft: '15px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start', 
                    zIndex: 1000, 
                    position: 'relative',
                    animation: isVisible ? 'fadeInRight 1.5s ease-out 0.7s' : 'none',
                    animationFillMode: 'both'
                  }}
                >
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      margin: 0,
                      textAlign: 'left',
                      color: '#d4af37',
                      fontSize: 'clamp(36px, 6vw, 72px)',
                      fontFamily: "'Allura', cursive",
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(212, 175, 55, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 700,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '2px',
                    }}
                  >
                    Vũ Tuấn Minh
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="custom-owl-slider" className="owl-slide" ref={sliderRef} style={{ zIndex: 1 }}>
        {sliderImages.map((img, index) => (
          <div key={index} className="item">
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default Hero

