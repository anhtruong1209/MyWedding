import type { Config } from "tailwindcss";

/**
 * Concept: "Câu chuyện cổ tích trong rừng rậm".
 * Tông SÁNG: sương mai, ngà, xanh ngọc/rêu, nắng vàng xuyên tán lá, cánh hoa hồng phấn.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nền sáng
        mist: "#F3F8F1",
        ivory: "#FDFBF5",
        cream: "#FAF6EC",

        // Chữ (xanh rêu đậm thay vì đen)
        ink: "#33453B",
        muted: "#6F8377",

        // Rừng
        forest: {
          DEFAULT: "#2F7A5C",
          deep: "#1F5744",
          soft: "#4F9E7A",
          moss: "#6E9B70",
          sage: "#A9C6AE",
          pale: "#D9E9DB",
        },

        // Nắng / đom đóm
        gold: {
          DEFAULT: "#D4AF6A",
          light: "#F1DDA6",
          deep: "#A8834A",
          glow: "#FFF0B8",
        },

        // Cánh hoa
        rose: {
          DEFAULT: "#E39BA0",
          soft: "#F2C7C7",
          petal: "#FBE6E2",
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
        soft: "0 24px 60px -28px rgba(31, 87, 68, 0.35)",
        glow: "0 0 50px -8px rgba(212, 175, 106, 0.65)",
        leaf: "0 18px 44px -22px rgba(47, 122, 92, 0.45)",
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
