/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      animation: { fade: "fade 0.5s ease forwards" },
      keyframes: {
        fade: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
