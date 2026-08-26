import type { Config } from "tailwindcss";

/**
 * Concept: "Câu chuyện cổ tích trong rừng rậm".
 * Tông SÁNG: nền ngà ấm, chữ & hoạ tiết đen mực, nắng vàng làm điểm nhấn chủ đạo,
 * xanh rêu chỉ xuất hiện như một chút điểm xuyết (ánh sáng, viền, hoạ tiết nhỏ).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nền sáng
        mist: "#F8F4E8",
        ivory: "#FDFBF5",
        cream: "#FAF6EC",

        // Chữ & hoạ tiết — mực đen ấm thay vì xanh rêu
        ink: {
          DEFAULT: "#1C1A16",
          deep: "#0D0C0A",
          soft: "#3D372E",
        },
        muted: "#6B6459",

        // Xanh rêu — chỉ dùng làm điểm nhấn nhỏ (viền, hoạ tiết, nền mờ)
        sage: {
          DEFAULT: "#A9C6AE",
          deep: "#5C8A6E",
          pale: "#D9E9DB",
        },

        // Nắng / đom đóm — màu chủ đạo
        gold: {
          DEFAULT: "#D4AF6A",
          light: "#F1DDA6",
          deep: "#A8834A",
          glow: "#FFF0B8",
        },

        /**
         * Chương của Hằng Châu — hồng phấn.
         * Cùng độ sáng với hệ rừng ở trên để hai chương đứng cạnh nhau không lệch tông,
         * chỉ đổi sắc: rêu -> hồng, nắng vàng -> hồng đào.
         */
        blush: {
          DEFAULT: "#E8879B",
          deep: "#B85C74",
          soft: "#F4A9B8",
          pale: "#FBD5DE",
          mist: "#FDEBF0",
          cloud: "#FFF7F9",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.35em" },
      boxShadow: {
        soft: "0 24px 60px -28px rgba(13, 12, 10, 0.32)",
        glow: "0 0 50px -8px rgba(212, 175, 106, 0.65)",
        leaf: "0 18px 44px -22px rgba(92, 138, 110, 0.45)",
        petal: "0 24px 60px -28px rgba(184, 92, 116, 0.38)",
        "petal-glow": "0 0 50px -8px rgba(244, 169, 184, 0.75)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "glow-pulse": "glow-pulse 3.5s ease-in-out infinite",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
