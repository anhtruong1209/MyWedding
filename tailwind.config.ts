import type { Config } from "tailwindcss";

/**
 * Hệ màu & typography cho web cưới Trâm & Trường.
 * Tông: ngà ấm + rượu vang sâu + ánh vàng gold, phong cách editorial hiện đại.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF5EF",
        ivory: "#FFFDFA",
        ink: "#2A2420",
        muted: "#6B5F57",
        wine: {
          DEFAULT: "#6A2E3E",
          deep: "#4A1D2B",
          soft: "#8C4A5C",
        },
        rose: {
          DEFAULT: "#C97B84",
          soft: "#E7C3C4",
          petal: "#F3DDD9",
        },
        gold: {
          DEFAULT: "#BFA06A",
          light: "#D9C29A",
          deep: "#9C7E4C",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(74, 29, 43, 0.35)",
        glow: "0 0 40px -6px rgba(191, 160, 106, 0.55)",
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "fade-up": "fade-up 0.9s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
