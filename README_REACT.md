# Wedding Website - React Version

Website đám cưới cho Vũ Tuấn Minh & Lê Thị Ngọc Minh - Phiên bản ReactJS

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy development server

```bash
npm run dev
```

Website sẽ chạy tại: `http://localhost:3000`

### Build cho production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 📁 Cấu trúc Project

```
MyWedding/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx      # Navigation bar
│   │   ├── Hero.jsx        # Hero section với slider
│   │   ├── Couple.jsx      # Giới thiệu cặp đôi
│   │   ├── Quote.jsx       # Câu chuyện tình yêu
│   │   ├── Events.jsx      # Thông tin sự kiện & countdown
│   │   ├── Gallery.jsx     # Bộ sưu tập ảnh
│   │   ├── Footer.jsx      # Footer
│   │   ├── RSVPPopup.jsx   # Form RSVP
│   │   └── BackgroundAudio.jsx  # Background music
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                  # Static files (images, music, etc.)
├── css/                    # CSS files (giữ nguyên từ project cũ)
├── js/                     # JavaScript libraries
├── package.json
├── vite.config.js
└── index.html

```

## ✨ Tính năng

- ✅ Responsive design
- ✅ Hero slider với tên cặp đôi
- ✅ Countdown timer cho 2 sự kiện
- ✅ Gallery với lightbox
- ✅ RSVP form
- ✅ Background music
- ✅ Smooth animations
- ✅ Google Maps integration

## 🔧 Tích hợp Libraries

Project sử dụng các thư viện từ project HTML gốc:
- jQuery & jQuery plugins (Owl Carousel, Magnific Popup, Countdown)
- WOW.js cho animations
- Bootstrap CSS
- Font Awesome icons

## 📝 Ghi chú

- File HTML gốc đã được backup
- CSS và JS files được giữ nguyên từ project cũ
- Images và assets nằm trong thư mục `public/`
- Cần cấu hình backend cho RSVP form (hiện tại chỉ log ra console)

## 🎨 Customization

Để thay đổi thông tin:
- Tên cặp đôi: `src/components/Hero.jsx`, `src/components/Couple.jsx`
- Ngày sự kiện: `src/components/Events.jsx`
- Câu chuyện: `src/components/Quote.jsx`
- Ảnh gallery: `src/components/Gallery.jsx`

## 📞 Support

Nếu có vấn đề, vui lòng kiểm tra:
1. Node version: `node --version` (cần 16+)
2. Dependencies đã cài đặt: `npm list`
3. Console errors trong browser

