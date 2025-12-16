import React, { useEffect, useRef } from 'react'
import './Gallery.css'

const Gallery = () => {
  const galleryRef = useRef(null)

  useEffect(() => {
    // Initialize Magnific Popup for gallery
    if (window.jQuery && window.jQuery.fn.magnificPopup) {
      if (galleryRef.current) {
        window.jQuery(galleryRef.current).magnificPopup({
          delegate: 'a.image-popup',
          type: 'image',
          gallery: {
            enabled: true,
          },
        })
      }
    }
  }, [])

  const galleryImages = [
    '/images/gallery/category-1/1.jpg',
    '/images/gallery/category-1/2.jpg',
    '/images/gallery/category-1/3.jpg',
    '/images/gallery/category-1/5.jpg',
    '/images/gallery/category-1/6.jpg',
    '/images/gallery/category-1/7.jpg',
  ]

  return (
    <section id="section-gallery" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="deco id-color" style={{ color: '#ffffff', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>Bộ sưu tập</span>
            </h2>
            <div className="spacer-single"></div>
          </div>
        </div>
        <div className="row gallery-grid" ref={galleryRef}>
          {galleryImages.map((img, index) => {
            // Add cache busting only in development or when needed
            const imageSrc = process.env.NODE_ENV === 'development' 
              ? `${img}?v=${Date.now()}` 
              : img;
            
            return (
              <div key={index} className="gallery-item col-md-4 col-sm-6 mb30">
                <div className="picframe img-rounded mb20">
                  <a className="image-popup" href={imageSrc}>
                    <span className="overlay-v">
                      <i></i>
                    </span>
                  </a>
                  <img
                    src={imageSrc}
                    className="img-responsive img-rounded gallery-img"
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback: try without cache busting
                      if (imageSrc.includes('?v=')) {
                        e.target.src = img;
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default Gallery

