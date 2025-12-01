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
        
        // Destroy existing instance if any
        if ($slider.data('owlCarousel')) {
          $slider.data('owlCarousel').destroy()
        }
        
        $slider.owlCarousel({
          items: 1,
          loop: true,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: false,
          nav: false,
          dots: false,
          animateOut: 'fadeOut',
          animateIn: 'fadeIn',
          smartSpeed: 600,
          autoplaySpeed: 600,
        })
      } else {
        // Retry if jQuery not ready
        setTimeout(initSlider, 100)
      }
    }
    
    // Wait a bit for scripts to load
    setTimeout(initSlider, 500)
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <div className="container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          <div className="row" style={{ margin: 0, width: '100%' }}>
            <div className="col-md-8 col-md-offset-2" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '0 15px' }}>
              <div 
                className="row" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '100%',
                  margin: 0,
                  flexDirection: 'column',
                  gap: '15px',
                  top: '220px'
                }}
              >
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1000, 
                    position: 'relative',
                    animation: isVisible ? 'fadeInUp 1.5s ease-out' : 'none',
                    animationFillMode: 'both',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '100%'
                  }}
                >
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                      color: '#7b9acc',
                      fontSize: 'clamp(36px, 6vw, 72px)',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
                      fontStyle: 'normal',
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(123, 154, 204, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 700,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '2px',
                      width: '100%'
                    }}
                  >
                    Ngọc Minh
                  </h2>
                  <span 
                    className="deco-big beating-heart" 
                    style={{
                      display: 'block',
                      color: '#7b9acc',
                      fontSize: 'clamp(60px, 10vw, 120px)',
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(123, 154, 204, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 1001,
                      position: 'relative',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
                      fontStyle: 'normal',
                      lineHeight: 1,
                      animation: isVisible ? 'zoomIn 1.5s ease-out 0.5s, pulse 2s ease-in-out infinite 2s' : 'none',
                      animationFillMode: 'both',
                      textAlign: 'center',
                      margin: '10px 0'
                    }}
                  >
                    &amp;
                  </span>
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.3',
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                      color: '#7b9acc',
                      fontSize: 'clamp(36px, 6vw, 72px)',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
                      fontStyle: 'normal',
                      textShadow: '5px 5px 15px rgba(0, 0, 0, 1), 0 0 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(123, 154, 204, 0.5), 3px 3px 6px rgba(0, 0, 0, 1)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 700,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '2px',
                      animation: isVisible ? 'fadeInUp 1.5s ease-out 0.7s' : 'none',
                      animationFillMode: 'both',
                      width: '100%'
                    }}
                  >
                    Tuấn Minh
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
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100vh', objectFit: 'cover', maxWidth: '100%' }} />
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default Hero

