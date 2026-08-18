import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#052E22",
          900: "#07402E",
          800: "#0B5A40",
          700: "#0F7350",
        },
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        sun: {
          400: "#FBBF24",
          500: "#F59E0B",
        },
        ink: {
          900: "#0B1220",
          700: "#2B3444",
          500: "#616E80",
          300: "#AEB8C4",
          100: "#F1F5F2",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade-light":
          "radial-gradient(1100px 500px at 85% -10%, rgba(16,185,129,0.14), transparent)",
        "dot-grid":
          "radial-gradient(rgba(6,78,59,0.10) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-sm": "18px 18px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,0.04), 0 8px 24px -8px rgba(11,18,32,0.10)",
        "card-hover": "0 4px 10px rgba(11,18,32,0.06), 0 16px 32px -12px rgba(11,18,32,0.18)",
      },
      borderRadius: {
        xl2: "1.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
