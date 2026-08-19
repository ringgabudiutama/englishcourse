import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // deep maroon — dark sections (navbar-dark, footer, stats, CTA)
        forest: {
          50: "#FDF3F3",
          100: "#F9E1E2",
          500: "#7A1620",
          600: "#63111A",
          700: "#4C0D14",
          800: "#35090E",
          900: "#200608",
          950: "#150304",
        },
        // primary vivid red — main brand color (buttons, links, headline accent)
        brand: {
          50: "#FFF2F3",
          100: "#FFE1E3",
          200: "#FFC4C9",
          300: "#FF98A1",
          400: "#F9606D",
          500: "#E31B33",
          600: "#D4152C",
          700: "#AD0F23",
          800: "#870E1E",
          900: "#5F0B16",
        },
        // bright vermilion — secondary accent (CTA highlights, badges, price tags)
        sun: {
          50: "#FFF4F1",
          100: "#FFE3DC",
          200: "#FFC3B3",
          300: "#FF9B85",
          400: "#FF5A36",
          500: "#E8441F",
          600: "#C13617",
        },
        // neutral warm grays for body text / borders
        ink: {
          900: "#1A1414",
          700: "#433636",
          500: "#6E6668",
          300: "#C9C0C1",
          100: "#F4EFEF",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade-light":
          "radial-gradient(1100px 500px at 85% -10%, rgba(212,21,44,0.14), transparent)",
        "dot-grid":
          "radial-gradient(rgba(122,22,32,0.12) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-sm": "18px 18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,20,20,0.05), 0 8px 24px -8px rgba(26,20,20,0.12)",
        "card-hover": "0 4px 10px rgba(26,20,20,0.07), 0 16px 32px -12px rgba(95,11,22,0.22)",
      },
      borderRadius: {
        xl2: "1.125rem",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(24px, -18px) scale(1.06)" },
          "66%": { transform: "translate(-16px, 14px) scale(0.96)" },
        },
        "blob-slow": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(-20px, 20px) scale(1.08)" },
        },
        "drift-bg": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200px 200px" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 26s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        blob: "blob 12s ease-in-out infinite",
        "blob-slow": "blob-slow 16s ease-in-out infinite",
        "drift-bg": "drift-bg 18s linear infinite alternate",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
