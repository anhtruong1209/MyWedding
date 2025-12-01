import React, { useState } from 'react'

const Prize = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedQR, setSelectedQR] = useState(null)

  const openQRModal = (type) => {
    setSelectedQR(type)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedQR(null)
  }

  return (
    <>
      <section id="section-prize" className="no-top no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>Hộp mừng cưới</h2>
              <div className="spacer-single"></div>
              <p style={{ fontSize: '18px', color: '#4a4a4a', marginBottom: '40px' }}>
                Chúng tôi rất cảm ơn tình cảm của bạn! 
                <br />
                Nếu bạn muốn gửi lời chúc mừng hoặc quà tặng, vui lòng quét mã QR bên dưới.
              </p>
            </div>
          </div>
          <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginTop: '50px', flexWrap: 'wrap' }}>
            <div className="col-md-4 text-center">
              <div 
                className="box"
                onClick={() => openQRModal('codau')}
              >
                <i className="fa fa-gift"></i>
                <h3>Cô dâu</h3>
                <p>Lê Thị Ngọc Minh</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div 
                className="box"
                onClick={() => openQRModal('chure')}
              >
                <i className="fa fa-gift"></i>
                <h3>Chú rể</h3>
                <p>Vũ Tuấn Minh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              animation: 'zoomIn 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '30px',
                color: '#d4af37',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(212, 175, 55, 0.1)'
                e.target.style.transform = 'rotate(90deg)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'none'
                e.target.style.transform = 'rotate(0deg)'
              }}
            >
              ×
            </button>
            <h3 style={{ 
              color: '#d4af37', 
              fontSize: '28px', 
              marginBottom: '20px',
              fontFamily: "'Allura', cursive"
            }}>
              {selectedQR === 'codau' ? 'Lê Thị Ngọc Minh' : 'Vũ Tuấn Minh'}
            </h3>
            <div style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '15px',
              display: 'inline-block',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <img 
                src={selectedQR === 'codau' ? '/images/qrcode_codau.png' : '/images/qrcode_chure.png'}
                alt={`QR Code ${selectedQR === 'codau' ? 'Cô dâu' : 'Chú rể'}`}
                style={{
                  width: '300px',
                  height: '300px',
                  maxWidth: '100%',
                  display: 'block'
                }}
              />
            </div>
            <p style={{ 
              marginTop: '20px', 
              color: '#4a4a4a', 
              fontSize: '16px' 
            }}>
              Quét mã QR để chuyển khoản hoặc gửi lời chúc mừng
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { 
            opacity: 0;
            transform: scale(0.8);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .box:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 15px 60px rgba(212, 175, 55, 0.8), inset 0 -5px 30px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </>
  )
}

export default Prize

