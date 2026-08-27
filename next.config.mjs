/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ảnh nguồn trong /public/images là WebP đã resize sẵn (xem scripts/optimize-images.mjs).
    // Next vẫn tự cắt theo breakpoint và đổi sang AVIF cho trình duyệt nào hỗ trợ.
    formats: ["image/avif", "image/webp"],
  },
  // three.js transpile không bắt buộc với @react-three/fiber v8, nhưng để an toàn:
  transpilePackages: ["three"],
  // "Câu chuyện" đã gộp thẳng vào trang chủ (mục #story) — giữ link cũ khỏi bị 404.
  async redirects() {
    return [{ source: "/story", destination: "/#story", permanent: false }];
  },
};

export default nextConfig;
