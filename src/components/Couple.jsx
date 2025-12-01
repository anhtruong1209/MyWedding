import React from 'react'
import './Couple.css'

const Couple = () => {
  return (
    <section id="section-couple" className="no-top no-bottom">
      <div className="container" style={{ maxWidth: '1400px', width: '100%' }}>
        <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', margin: 0 }}>
          {/* Cô dâu - Bên trái */}
          <div className="col-md-5 text-center" style={{ padding: '30px' }}>
            <img
              src="/images/misc/2.jpg"
              alt="Lê Thị Ngọc Minh"
              className="img-responsive img-rounded wow fadeInLeft zoom-in"
              data-wow-delay=".2s"
              style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)' }}
            />
            <div className="padding40 wow slideUpFade" data-wow-delay=".4s">
              <h2>Lê Thị Ngọc Minh</h2>
              <p>
                Cô gái xinh đẹp, dịu dàng và đầy tình cảm. "Em là ánh sáng của cuộc đời anh, 
                là ngôi sao sáng nhất trên bầu trời đêm." ❤️
              </p>
              <div className="social-icons-sm">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-rss"></i></a>
                <a href="mailto:doquynhtram2010@gmail.com">
                  <i className="fa fa-google-plus"></i>
                </a>
                <a href="mailto:doquynhtram2010@gmail.com">
                  <i className="fa fa-envelope-o"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Trái tim ở giữa */}
          <div className="col-md-2 text-center" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span 
              className="circle wow zoomIn pulse beating-heart" 
              data-wow-delay=".8s"
              style={{
                display: 'inline-block',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #f4d03f)',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            >
              <i className="fa fa-heart" style={{ color: '#fff', fontSize: '40px' }}></i>
            </span>
          </div>

          {/* Chú rể - Bên phải */}
          <div className="col-md-5 text-center" style={{ padding: '30px' }}>
            <img
              src="/images/misc/1.jpg"
              alt="Vũ Tuấn Minh"
              className="img-responsive img-rounded wow fadeInRight zoom-in"
              data-wow-delay=".2s"
              style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '15px', boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)' }}
            />
            <div className="padding40 wow slideUpFade" data-wow-delay=".6s">
              <h2>Vũ Tuấn Minh</h2>
              <p>
                Chàng trai dịu dàng, thân thiện, luôn yêu đời, yêu âm nhạc và thích phiêu lưu. 
                "Trên đời này chỉ có một thứ hạnh phúc duy nhất là yêu và được yêu em." ❤️
              </p>
              <div className="social-icons-sm">
                <a href="$">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-rss"></i></a>
                <a href="#"><i className="fa fa-google-plus"></i></a>
                <a href="#"><i className="fa fa-envelope-o"></i></a>
              </div>
            </div>
          </div>

          <div className="clearfix"></div>
        </div>
      </div>
    </section>
  )
}

export default Couple

