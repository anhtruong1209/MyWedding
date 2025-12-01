import React from 'react'

const Quote = () => {
  return (
    <section
      id="section-quote"
      className="text-light"
      data-stellar-background-ratio=".2"
    >
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-md-8 col-md-offset-2">
            <blockquote 
              className="very-big text-light wow fadeIn slide-up-fade" 
              data-wow-delay=".3s"
              style={{
                color: '#333',
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.5)',
                fontWeight: 500,
                opacity: 1,
                lineHeight: '1.8',
                background: 'rgba(255, 255, 255, 0.85)',
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              "Từ những ngày đầu gặp nhau, Minh và Minh đã biết rằng đây chính là định mệnh. 
              Mỗi khoảnh khắc bên nhau đều là một món quà, mỗi nụ cười đều là một kỷ niệm đáng trân trọng. 
              Chúng ta đã cùng nhau trải qua bao thăng trầm, cùng nhau lớn lên và trưởng thành. 
              Giờ đây, khi đứng trước ngưỡng cửa hôn nhân, chúng ta tin chắc rằng tình yêu này sẽ mãi mãi bền vững, 
              và người mà ta nắm tay ngày hôm nay sẽ là người đồng hành cùng ta đi đến suốt cuộc đời."
              <br /><br />
              <span style={{ fontStyle: 'italic', fontSize: '0.9em' }}>
                — Lê Thị Ngọc Minh & Vũ Tuấn Minh
              </span>
              <span className="beating-heart">~ ❤️ ~</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quote

