import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = ({ onRSVPClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerHeight = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={isScrolled ? 'smaller' : ''}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="logo">
                <h2>Minh <span>&amp;</span> Minh</h2>
            </div>

            <span 
              id="menu-btn" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            ></span>

            <span className="btn-rsvp" onClick={onRSVPClick}>
              Lời mời hân hạnh
            </span>

            <nav>
              <ul id="mainmenu" className={isMobileMenuOpen ? 'open' : ''}>
                <li>
                  <a href="#section-hero" onClick={(e) => handleNavClick(e, 'section-hero')}>Trang chủ</a>
                </li>
                <li>
                  <a href="#section-couple" onClick={(e) => handleNavClick(e, 'section-couple')}>Giới thiệu</a>
                  <ul>
                    <li><a href="#section-couple" onClick={(e) => handleNavClick(e, 'section-couple')}>Giới thiệu cô dâu</a></li>
                    <li><a href="#section-couple" onClick={(e) => handleNavClick(e, 'section-couple')}>Giới thiệu chú rể</a></li>
                  </ul>
                </li>
                <li><a href="#section-quote" onClick={(e) => handleNavClick(e, 'section-quote')}>Câu chuyện</a></li>
                <li><a href="#section-event" onClick={(e) => handleNavClick(e, 'section-event')}>Sự kiện</a></li>
                <li><a href="#section-gallery" onClick={(e) => handleNavClick(e, 'section-gallery')}>Bộ sưu tập</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

