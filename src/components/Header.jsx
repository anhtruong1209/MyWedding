import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = ({ onRSVPClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle smooth scroll for homepage sections
  const handleNavClick = (e, targetId) => {
    if (location.pathname !== '/') {
      return // Let Link handle navigation
    }
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
              Lời mời
            </span>

            <nav>
              <ul id="mainmenu" className={isMobileMenuOpen ? 'open' : ''}>
                <li>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" onClick={() => setIsMobileMenuOpen(false)}>Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/cau-chuyen" onClick={() => setIsMobileMenuOpen(false)}>Câu chuyện</Link>
                </li>
                <li>
                  <Link to="/su-kien" onClick={() => setIsMobileMenuOpen(false)}>Sự kiện</Link>
                </li>
                <li>
                  <Link to="/bo-suu-tap" onClick={() => setIsMobileMenuOpen(false)}>Bộ sưu tập</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

