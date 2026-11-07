import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050D1A",
          900: "#0A192F",
          800: "#0F294A",
          700: "#163B68",
          600: "#1E4E87",
        },
        brand: {
          50: "#F0F8FF",
          100: "#E0F1FE",
          200: "#B9E3FE",
          300: "#7CCDFD",
          400: "#36B3FA",
          500: "#188BF6",
          600: "#0B6FD4",
          700: "#0A58AB",
        },
        accent: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 25px -5px rgba(24, 139, 246, 0.45)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
