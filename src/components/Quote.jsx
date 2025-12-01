import React from 'react'

const Quote = () => {
  return (
    <section
      id="section-quote"
      className="text-light"
      data-stellar-background-ratio=".2"
      style={{ marginTop: 0, paddingTop: '40px' }}
    >
      <div className="container" style={{ maxWidth: '1400px', width: '100%' }}>
        <div className="row wow fadeInUp" style={{ margin: 0 }}>
          <div className="col-md-10 col-md-offset-1" style={{ padding: 0 }}>
            <blockquote 
              className="very-big text-light wow fadeIn slide-up-fade" 
              data-wow-delay=".3s"
              style={{
                color: '#2c3e50',
                textShadow: 'none',
                fontWeight: 400,
                opacity: 1,
                lineHeight: '2',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '50px 60px',
                borderRadius: '15px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                margin: 0,
                fontSize: '18px',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: '0.5px',
                border: 'none',
                width: '100%'
              }}
            >
              <p style={{ 
                margin: 0, 
                padding: 0, 
                fontSize: '20px',
                lineHeight: '2',
                color: '#2c3e50',
                fontStyle: 'normal'
              }}>
                "Từ những ngày đầu gặp nhau, Minh và Minh đã biết rằng đây chính là định mệnh. 
                Mỗi khoảnh khắc bên nhau đều là một món quà, mỗi nụ cười đều là một kỷ niệm đáng trân trọng. 
                Chúng ta đã cùng nhau trải qua bao thăng trầm, cùng nhau lớn lên và trưởng thành. 
                Giờ đây, khi đứng trước ngưỡng cửa hôn nhân, chúng ta tin chắc rằng tình yêu này sẽ mãi mãi bền vững, 
                và người mà ta nắm tay ngày hôm nay sẽ là người đồng hành cùng ta đi đến suốt cuộc đời."
              </p>
              <br />
              <div style={{ 
                textAlign: 'right', 
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                <span style={{ 
                  fontStyle: 'italic', 
                  fontSize: '16px',
                  color: '#d4af37',
                  fontWeight: 500
                }}>
                  — Lê Thị Ngọc Minh & Vũ Tuấn Minh
                </span>
                <span className="beating-heart" style={{ marginLeft: '10px', fontSize: '18px' }}>❤️</span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quote

