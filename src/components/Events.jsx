import React, { useEffect, useRef, useState } from 'react'
import './Events.css'

const Events = () => {
  const [timers, setTimers] = useState({
    big: '',
    girl: '',
    boy: '',
  })

  useEffect(() => {
    const targets = {
      girl: new Date(2025, 11, 25, 16, 0, 0).getTime(), // 25/12/2025 16:00
      boy: new Date(2025, 11, 27, 17, 0, 0).getTime(),  // 27/12/2025 17:00
    }
    targets.big = targets.girl
    targets.boy = targets.boy
    const fmt = (ms) => {
      if (ms <= 0) return '00 : 00 : 00 : 00'
      const totalSec = Math.floor(ms / 1000)
      const days = Math.floor(totalSec / 86400)
      const hours = Math.floor((totalSec % 86400) / 3600)
      const mins = Math.floor((totalSec % 3600) / 60)
      const secs = totalSec % 60
      const pad = (n) => String(n).padStart(2, '0')
      return `${pad(days)} : ${pad(hours)} : ${pad(mins)} : ${pad(secs)}`
    }

    const tick = () => {
      const now = Date.now()
      setTimers({
        big: fmt(targets.big - now),
        girl: fmt(targets.girl - now),
        boy: fmt(targets.boy - now),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="section-event">
      <div className="container">
        <div className="big-countdown">
          <div className="big-date">Thứ Năm, ngày 25/12/2025</div>
          <div className="big-timer">{timers.big}</div>
        </div>
        <div className="big-countdown">
          <div className="big-date">Thứ bảy, ngày 27/12/2025</div>
          <div className="big-timer">{timers.boy}</div>
        </div>

        <div className="event-block">
          <div className="event-media wow fadeInRight">
            <img
              src="/images/misc/3.jpg"
              alt="Event"
              className="img-responsive img-rounded"
            />
          </div>
          <div className="event-card">
            <h2 className="deco id-color">
              <span>Lễ cưới nhà gái</span>
            </h2>
            <h2 className="event-date">Thứ Năm, ngày 25 tháng 12 năm 2025</h2>
            <div className="event-time">Đón khách: 16:00</div>
            <div className="event-location">Diệp Linh Plaza - Tầng 3, Sảnh Diamond</div>
            <div className="spacer-single"></div>
            <p>
              Chiều 16:00h, chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
            </p>
            <div className="spacer-single"></div>
            <div className="event-media">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.168891701722!2d105.8466095!3d21.145675999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135014d25867e1f%3A0x84ec18e03861dbd2!2sDi%E1%BB%87p%20Linh%20Plaza!5e0!3m2!1svi!2s!4v1765880197885!5m2!1svi!2s"
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
          <div className="event-media wow fadeInLeft">
            <img
              src="/images/misc/4.jpg"
              alt="Event"
              className="img-responsive img-rounded"
            />
          </div>
          <div className="event-card">
            <h2 className="deco id-color">
              <span>Lễ cưới nhà trai</span>
            </h2>
            <h2 className="event-date">Thứ Bảy, ngày 27 tháng 12 năm 2025</h2>
            <div className="event-time">Đón khách: 17:00</div>
            <div className="spacer-single"></div>
            <div className="event-location">Trung Tâm Hội Nghị Tiệc Cưới Forevermark</div>
            <p>
              Chiều 17:00h, chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
            </p>
            <div className="event-media">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.9317213309714!2d105.8159664!3d21.0753891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aaede963b7e7%3A0x3945a8dcf037f761!2zVHJ1bmcgVMOibSBI4buZaSBOZ2jhu4sgVGnhu4djIEPGsOG7m2kgRm9yZXZlcm1hcms!5e0!3m2!1svi!2s!4v1765880248173!5m2!1svi!2s"
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

