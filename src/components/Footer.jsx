import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="hs1 wow fadeInUp">
              Ngọc Minh <span>&amp;</span> Tuấn Minh
            </h2>
            <div className="spacer-single"></div>
            <p className="wow fadeInUp">
              Cảm ơn bạn đã đến và chia sẻ niềm vui cùng chúng tôi trong ngày trọng đại này.
            </p>
            <div className="spacer-single"></div>
            <div className="social-icons-sm">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-instagram"></i></a>
              <a href="#"><i className="fa fa-pinterest"></i></a>
            </div>
            <div className="spacer-single"></div>
            <div className="copyright">
              &copy; Copyright 2025 - Thiết kế bởi Tuấn Minh
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

