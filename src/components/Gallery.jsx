import React, { useEffect, useRef } from 'react'

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
    '/images/gallery/category-1/7.jpg',
    '/images/gallery/category-1/8.jpg',
    '/images/gallery/category-1/9.jpg',
  ]

  return (
    <section id="section-gallery" className="no-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="deco id-color">
              <span>Bộ sưu tập</span>
            </h2>
            <div className="spacer-single"></div>
          </div>
        </div>
        <div className="row" ref={galleryRef}>
          {galleryImages.map((img, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb30">
              <div className="picframe img-rounded mb20">
                <a className="image-popup" href={img}>
                  <span className="overlay-v">
                    <i></i>
                  </span>
                </a>
                <img
                  src={img}
                  className="img-responsive img-rounded"
                  alt={`Gallery ${index + 1}`}
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

