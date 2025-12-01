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
                    gap: '15px',
                    width: '100%'
                  }}
                >
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.2',
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                      color: '#ffffff',
                      fontSize: 'clamp(48px, 8vw, 96px)',
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontStyle: 'normal',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 400,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '1px',
                      width: '100%'
                    }}
                  >
                    Ngọc<br />Minh
                  </h2>
                  <span 
                    className="deco-big beating-heart" 
                    style={{
                      display: 'block',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: 'clamp(72px, 12vw, 144px)',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 1001,
                      position: 'relative',
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontStyle: 'italic',
                      lineHeight: 1,
                      animation: isVisible ? 'zoomIn 1.5s ease-out 0.5s, pulse 2s ease-in-out infinite 2s' : 'none',
                      animationFillMode: 'both',
                      textAlign: 'center',
                      margin: '20px 0',
                      fontWeight: 300
                    }}
                  >
                    &amp;
                  </span>
                  <h2 
                    className="name" 
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                      lineHeight: '1.2',
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                      color: '#ffffff',
                      fontSize: 'clamp(48px, 8vw, 96px)',
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontStyle: 'normal',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5)',
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      fontWeight: 400,
                      zIndex: 1001,
                      position: 'relative',
                      letterSpacing: '1px',
                      animation: isVisible ? 'fadeInUp 1.5s ease-out 0.7s' : 'none',
                      animationFillMode: 'both',
                      width: '100%'
                    }}
                  >
                    Tuấn<br />Minh
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

