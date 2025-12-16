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
    '/images/gallery/category-1/4.jpg',
    '/images/gallery/category-1/5.jpg',
    '/images/gallery/category-1/6.jpg',
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
        <div className="row gallery-vertical" ref={galleryRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item-vertical" style={{ width: '100%', maxWidth: '600px' }}>
              <div className="picframe img-rounded mb20" style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
                <a className="image-popup" href={img}>
                  <span className="overlay-v">
                    <i></i>
                  </span>
                </a>
                <img
                  src={img}
                  className="img-responsive img-rounded gallery-vertical-img"
                  alt={`Gallery ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover',
                    display: 'block',
                    aspectRatio: 'auto'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery

