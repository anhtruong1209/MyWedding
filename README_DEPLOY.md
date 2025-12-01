# Hướng dẫn Deploy lên Vercel

## Các bước deploy:

1. **Đảm bảo đã commit tất cả thay đổi:**
   ```bash
   git add .
   git commit -m "Update for deployment"
   git push
   ```

2. **Trên Vercel Dashboard:**
   - Vào project settings
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite

3. **File cấu hình đã có:**
   - `vercel.json` - đã được tạo để handle routing
   - `vite.config.js` - đã cấu hình đúng
   - `public/images/` - đã copy tất cả images vào đây

## Lưu ý:

- Tất cả images phải ở trong `public/images/` để Vite có thể build
- React Router cần `vercel.json` để handle client-side routing
- Nếu có lỗi, kiểm tra build logs trên Vercel dashboard

