import React from 'react'

const Couple = () => {
  return (
    <section id="section-couple" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-5 text-center">
            <img
              src="/images/misc/2.jpg"
              alt="Lê Thị Ngọc Minh"
              className="img-responsive img-rounded wow fadeInLeft zoom-in"
              data-wow-delay=".2s"
            />
            <div className="padding40 wow slideUpFade" data-wow-delay=".4s">
              <h2>Lê Thị Ngọc Minh</h2>
              <p>
                Cô gái xinh đẹp, dịu dàng và đầy tình cảm. "Em là ánh sáng của cuộc đời anh, 
                là ngôi sao sáng nhất trên bầu trời đêm." ❤️
              </p>
              <div className="social-icons-sm">
                <a href="https://www.facebook.com/profile.php?id=100006943964259">
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

          <div className="col-md-2 col-md-offset-5 text-center absolute">
            <span className="circle wow zoomIn pulse beating-heart" data-wow-delay=".8s">
              <i className="fa fa-heart float-animation"></i>
            </span>
          </div>

          <div className="col-md-5 text-center col-md-offset-7">
            <img
              src="/images/misc/1.jpg"
              alt="Vũ Tuấn Minh"
              className="img-responsive img-rounded wow fadeInRight zoom-in"
              data-wow-delay=".2s"
            />
            <div className="padding40 wow slideUpFade" data-wow-delay=".6s">
              <h2>Vũ Tuấn Minh</h2>
              <p>
                Lập trình viên vui tính, luôn yêu đời, yêu âm nhạc và thích phiêu lưu. 
                "Trên đời này chỉ có một thứ hạnh phúc duy nhất là yêu và được yêu em." ❤️
              </p>
              <div className="social-icons-sm">
                <a href="https://www.facebook.com/anhtruong1209">
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

