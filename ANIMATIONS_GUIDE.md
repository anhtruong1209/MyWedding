# ✨ Wedding Animations Guide

## 🎨 Tổng Quan Các Animation Đã Thêm Vào

Website thiệp cưới đã được nâng cấp với nhiều hiệu ứng animation đẹp mắt và sang trọng!

---

## 📁 Các File Mới Đã Thêm

### 1. **css/custom-animations.css**
File CSS chứa các animation custom:
- Floating hearts animation
- Heartbeat effect
- Image reveal animations
- Shimmer effects
- Sparkle animations
- Gradient text animations
- Fade in/out animations
- Zoom in/out effects
- Slide up animations
- Pulse effects
- Text reveal animations
- And much more...

### 2. **css/luxury-theme.css**
File CSS cho phối màu sang trọng:
- **Palette màu chính:**
  - Gold (#d4af37)
  - Rose Pink (#f8e5e5)
  - Ivory (#faf8f3)
  - Champagne (#f7e7ce)
  - Elegant Grey (#4a4a4a)

- **Màu phụ:**
  - Gold Light (#f4e5aa)
  - Gold Dark (#b8941f)
  - Soft Gold (#fff8e7)
  - Cream (#f5ede0)

### 3. **js/wedding-animations.js**
File JavaScript chứa các hiệu ứng động:
- Floating hearts tự động tạo ra
- Typing animation cho tên cô dâu chú rể
- Scroll progress indicator
- Smooth scroll
- Scroll reveal animations
- Image hover effects với 3D
- Sparkle effects
- Magnetic buttons
- Ripple effects
- Parallax effects

---

## 🎯 Các Animation Đang Hoạt Động

### 1. **Hero Section (Trang đầu)**
- ❤️ Trái tim bay lơ lửng tự động
- ✨ Typing animation cho tên
- 💓 Heartbeat effect cho ký tự "&"
- 🌟 Zoom in effect khi scroll

### 2. **Section Cô Dâu & Chú Rể**
- 📸 Image reveal animation (reveal từ trái/phải)
- 🎭 3D hover effects cho ảnh
- 💕 Heart icon floating animation
- 📝 Text slide up animation

### 3. **Section Quote (Câu chuyện)**
- 💬 Text reveal từ clip-path
- ❤️ Heart icon beating animation
- 🎨 Gradient background
- 🌈 Shimmer effects

### 4. **Section Events (Sự kiện)**
- 🗓️ Fade in animations
- 📍 Map zoom on hover
- ⭐ Stagger animations (tuần tự)

### 5. **Section Countdown**
- ⏰ WOW animations
- ❤️ Hearts pattern background
- 🌟 Sparkle effects

### 6. **Section Gallery (Bộ sưu tập)**
- 🖼️ 3D card effects on hover
- 🎨 Hover zoom & rotate
- ✨ Shimmer overlay
- 📸 Image gallery animations

### 7. **Section Guestbook**
- 💌 Card lift on hover
- ✨ Box shadow effects
- 📝 Text animations

### 8. **Section Prize (Hộp mừng)**
- 🎁 Gold gradient box
- 🌈 Rotating animation on hover
- ✨ Glow effects
- 💫 Magnetic hover

### 9. **Footer**
- 🎨 Gold gradient text
- 🌟 Shimmer effects
- ✨ Luxury styling

---

## 🎨 Phối Màu Sang Trọng

### Primary Colors (Màu chính):
- **Gold** (#d4af37) - Màu vàng trang trọng
- **Rose Pink** (#f8e5e5) - Hồng nhẹ nhàng
- **Ivory** (#faf8f3) - Kem trắng sang trọng

### Accent Colors (Màu nhấn):
- **Gold Dark** (#b8941f) - Vàng đậm
- **Gold Light** (#f4e5aa) - Vàng sáng
- **Champagne** (#f7e7ce) - Sâm panh

### Background Colors:
- **Cream** (#f5ede0) - Kem nhẹ
- **Soft Gold** (#fff8e7) - Vàng nhạt
- **Elegant Grey** (#4a4a4a) - Xám trang trọng

---

## 🚀 Cách Sử Dụng

### 1. Áp dụng Animation Classes

Thêm các class sau vào element cần animation:

```html
<!-- Fade in from left -->
<div class="fade-in-left">...</div>

<!-- Fade in from right -->
<div class="fade-in-right">...</div>

<!-- Zoom in -->
<div class="zoom-in">...</div>

<!-- Slide up with fade -->
<div class="slide-up-fade">...</div>

<!-- Float animation -->
<div class="float-animation">...</div>

<!-- Pulse effect -->
<div class="pulse">...</div>

<!-- Beating heart -->
<span class="beating-heart">❤️</span>

<!-- Gradient text -->
<h1 class="gradient-text">Text</h1>

<!-- Hover lift -->
<div class="lift-on-hover">...</div>

<!-- Glow on hover -->
<div class="glow-on-hover">...</div>
```

### 2. WOW.js Animations

Thêm class `wow` và các animation của WOW.js:

```html
<div class="wow fadeInUp" data-wow-delay=".5s">...</div>
<div class="wow zoomIn" data-wow-delay=".3s">...</div>
<div class="wow fadeInLeft" data-wow-delay=".2s">...</div>
<div class="wow fadeInRight" data-wow-delay=".4s">...</div>
<div class="wow slideUpFade" data-wow-delay=".6s">...</div>
```

### 3. Custom Data Attributes

```html
<!-- Animation type -->
<div data-animation="image-reveal">...</div>
<div data-animation="text-reveal">...</div>
<div data-animation="zoom-in">...</div>

<!-- Parallax speed -->
<div data-parallax="0.5">...</div>
<div data-scroll-speed="2">...</div>
```

---

## 💡 Tips Để Website Đẹp Hơn

### 1. Sử dụng Gold cho các phần quan trọng
```css
color: var(--gold);
```

### 2. Thêm gradient backgrounds
```css
background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
```

### 3. Box shadows với gold
```css
box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
```

### 4. Hover effects
```css
transition: all 0.5s ease;
transform: translateY(-10px);
```

---

## 🎬 Performance Tips

1. **Không lạm dụng animation** - Quá nhiều animation sẽ làm lag
2. **Sử dụng GPU acceleration** - transform, opacity
3. **Lazy load images** - Dùng loading="lazy"
4. **Optimize animations** - Dùng will-change khi cần

---

## 🐛 Troubleshooting

### Animation không chạy?
- Kiểm tra xem đã include CSS và JS files chưa
- Đảm bảo WOW.js đã được khởi tạo
- Kiểm tra console để xem lỗi JavaScript

### Animation chạy không mượt?
- Giảm số lượng animation cùng lúc
- Sử dụng requestAnimationFrame
- Optimize CSS với will-change

### Màu sắc không đúng?
- Kiểm tra file luxury-theme.css đã được include
- Xem lại thứ tự CSS files
- Clear browser cache

---

## 📝 Note

- Tất cả animations đã được tối ưu cho mobile
- Responsive design đảm bảo
- Cross-browser compatible
- Touch-friendly on mobile

---

## 🎉 Kết Quả

Website giờ đã có:
- ✨ Animations mượt mà và đẹp mắt
- 🎨 Phối màu vàng hồng sang trọng
- 💎 Hiệu ứng 3D và parallax
- ❤️ Hearts và sparkles
- 🌈 Gradients và shadows
- 📱 Responsive design
- 🚀 Performance tốt

**Website giờ đã đẹp và sang trọng như một thiệp cưới thật!** 🎊
