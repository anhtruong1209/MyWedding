import React, { useState } from 'react'

const RSVPPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    attend: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('RSVP Form submitted:', formData)
    // You can add API call here
    alert('Cảm ơn bạn đã xác nhận tham dự!')
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div id="popup-box" className="full-height" style={{ display: 'block' }}>
      <span className="btn-close" onClick={onClose}>
        <i className="icon_close"></i>
      </span>

      <div className="container center-y">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="deco id-color">
              <span>Chúng tôi mời bạn vào</span>
            </h2>
            <h2 data-wow-delay=".2s">
              Thứ Bảy, ngày 27 tháng 12 năm 2025
            </h2>
          </div>

          <div className="spacer-double"></div>

          <div className="col-md-5 col-md-offset-1 text-right">
            <h3>Tổ chức lễ cưới</h3>
            Chiều 17:00h, Tại Trung Tâm Hội Nghị Tiệc Cưới Forevermark
            <br />
            Chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
          </div>

          <div className="col-md-5">
            <h3>Tiệc cưới</h3>
            Chiều 17:00h, Tại Trung Tâm Hội Nghị Tiệc Cưới Forevermark
            <br />
            Chúng tôi rất vui mừng được chia sẻ ngày trọng đại này cùng bạn!
          </div>

          <div className="spacer-double"></div>

          <form
            name="rsvp"
            id="rsvp_form"
            className="form-underline"
            onSubmit={handleSubmit}
          >
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Trân trọng kính mời (ông, bà):"
                required
                maxLength="50"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Gmail của (ông, bà):"
                required
                maxLength="50"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <select
                id="guest"
                name="guests"
                className="form-control"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                <option value="">Số lượng tham dự</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                id="attend"
                name="attend"
                className="form-control"
                value={formData.attend}
                onChange={handleChange}
                required
              >
                <option value="">(Ông, bà) có tham dự?</option>
                <option value="yes">Có</option>
                <option value="no">Không</option>
              </select>
            </div>
            <div className="col-md-12 text-center">
              <div className="spacer-single"></div>
              <input
                type="submit"
                id="submit"
                value="Hoàn thành"
                className="btn btn-custom"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RSVPPopup

