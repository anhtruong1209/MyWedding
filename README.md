# 💍 Website cưới Quỳnh Trâm & Anh Trường

Thiệp cưới online, dựng lại bằng **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, có
**hiệu ứng 3D** (react-three-fiber / three.js) và animation cuộn mượt (Framer Motion).

> Phiên bản trước là HTML tĩnh (jQuery/Bootstrap). Toàn bộ nội dung, ảnh, nhạc, RSVP và mã QR mừng
> cưới đã được chuyển sang cấu trúc component hiện đại, tối ưu ảnh và deploy trên Vercel.

## ✨ Tính năng

- **3D hero**: cặp nhẫn cưới vàng xoay (3D) + mưa tim/cánh hoa bay theo con trỏ chuột.
- **Đa trang**: `/` (một trang cuộn) và các route `/about-her`, `/about-him`, `/story`, `/events`, `/gallery`.
- **Đếm kỷ niệm**: "đã kết hôn được X ngày" (tự chuyển sang đếm ngược nếu đặt ngày ở tương lai).
- **Gallery** có tab danh mục + lightbox phóng to (phím ← → Esc).
- **RSVP** gửi email qua EmailJS, **Hộp mừng cưới** với QR + copy STK + Messenger/Zalo.
- **Nhạc nền** bật/tắt, **thẻ ảnh nghiêng 3D** (tilt), tôn trọng `prefers-reduced-motion`.

## 🚀 Chạy dự án

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build production
npm start       # chạy bản production
```

## ✏️ Sửa nội dung

Gần như **toàn bộ nội dung nằm trong một file duy nhất**: [`src/data/site.ts`](src/data/site.ts)
— tên cô dâu/chú rể, ngày giờ, địa chỉ, bản đồ, timeline, lời chúc, mã QR/STK, cấu hình EmailJS,
danh sách ảnh gallery. Sửa ở đây là tất cả các trang tự cập nhật.

Ảnh & nhạc đặt trong [`public/images`](public/images) và [`public/music`](public/music).

## 🗂️ Cấu trúc

```
app/                     # App Router: layout, trang chủ và các route con
src/
  data/site.ts           # NGUỒN DỮ LIỆU DUY NHẤT
  lib/utils.ts           # tiện ích (cn)
  components/
    three/               # 3D: HeartCanvas, RingsCanvas + wrapper ssr:false
    ui/                  # Reveal, SectionTitle, TiltCard, CountUp, Lightbox
    layout/              # Navbar, Footer, MusicToggle, Preloader, PageHeader
    sections/            # Hero, Couple, Quote, Events, Counter, Gift, Rsvp...
    gallery/             # GalleryGrid, GalleryTabs
public/                  # ảnh, nhạc, favicon
```

## ☁️ Deploy Vercel

Repo đã liên kết sẵn với project Vercel `minhminh-wedding`. Chỉ cần push lên `main`,
Vercel tự build & deploy (framework preset: **Next.js**).

Biến môi trường tuỳ chọn: `NEXT_PUBLIC_SITE_URL` (URL production) để metadata Open Graph chính xác.

---

© 2024 · Thiết kế bởi Anh Trường · Rebuild với Next.js + 3D
