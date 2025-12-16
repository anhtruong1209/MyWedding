import React, { useEffect, useRef } from 'react'
import './Events.css'

const Events = () => {
  const countdownRef1 = useRef(null)
  const countdownRef2 = useRef(null)

  useEffect(() => {
    // Initialize countdown timers
    if (window.jQuery && window.jQuery.fn.countdown) {
      if (countdownRef1.current) {
        window.jQuery(countdownRef1.current).countdown({
          until: new Date(2025, 11, 27, 17), // 27/12/2025 17:00 - Nhà trai
        })
      }
      if (countdownRef2.current) {
        window.jQuery(countdownRef2.current).countdown({
          until: new Date(2025, 11, 25, 17), // 25/12/2025 17:00 - Nhà gái
        })
      }
    }
  }, [])

  return (
    <section id="section-event">
      <div className="container">
        <div className="event-block">
          <div className="event-media wow fadeInLeft">
            <img
              src="/images/misc/3.jpg"
              alt="Event"
              className="img-responsive img-rounded"
            />
          </div>
          <div className="event-card">
            <h2 className="deco id-color">
              <span>Lễ cưới nhà trai</span>
            </h2>
            <h2>Thứ Bảy, ngày 27 tháng 12 năm 2025</h2>
            <div className="spacer-single"></div>
            <p>
              Chiều 17:00h, Tại Trung Tâm Hội Nghị Tiệc Cưới Forevermark
              <br />
              Chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
            </p>
            <div className="spacer-single"></div>
            <div id="defaultCountdown" ref={countdownRef1}></div>
            <div className="spacer-single"></div>
            <div className="event-media">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1234567890!2d106.1234567!3d20.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA3JzI0LjQiTiAxMDbCsDA3JzI0LjQiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="spacer-double"></div>

        <div className="event-block">
          <div className="event-media wow fadeInRight">
            <img
              src="/images/misc/4.jpg"
              alt="Event"
              className="img-responsive img-rounded"
            />
          </div>
          <div className="event-card">
            <h2 className="deco id-color">
              <span>Lễ cưới nhà gái</span>
            </h2>
            <h2>Thứ Năm, ngày 25 tháng 12 năm 2025</h2>
            <div className="spacer-single"></div>
            <p>
              Chiều 17:00h, Tại Diệp Linh Plaza
              <br />
              Chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
            </p>
            <div className="spacer-single"></div>
            <div id="defaultCountdownHoi" ref={countdownRef2}></div>
            <div className="spacer-single"></div>
            <div className="event-media">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1234567890!2d106.1234567!3d20.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA3JzI0LjQiTiAxMDbCsDA3JzI0LjQiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events

