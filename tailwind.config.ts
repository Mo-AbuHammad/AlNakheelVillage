import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#F9AD51",
          light: "#FBD08A",
          dark: "#E8962E",
        },
        green: {
          DEFAULT: "#178F44",
          light: "#1EAD53",
          dark: "#0F6A32",
        },
        blue: {
          DEFAULT: "#1DA5DE",
          light: "#4BBCE8",
          dark: "#1589BD",
        },
        beige: {
          DEFAULT: "#D6CBBF",
          light: "#EAE4DC",
          dark: "#B8A99A",
        },
        cream: "#FAF8F4",
        dark: "#1A1A1A",
        charcoal: "#2C2C2C",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F9AD51 0%, #E8962E 100%)",
        "green-gradient": "linear-gradient(135deg, #178F44 0%, #0F6A32 100%)",
        "hero-gradient":
          "linear-gradient(to bottom, rgba(26,26,26,0.3) 0%, rgba(26,26,26,0.6) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
