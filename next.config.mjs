/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ảnh cưới đã được tối ưu sẵn trong /public/images.
    formats: ["image/avif", "image/webp"],
  },
  // three.js transpile không bắt buộc với @react-three/fiber v8, nhưng để an toàn:
  transpilePackages: ["three"],
};

export default nextConfig;
