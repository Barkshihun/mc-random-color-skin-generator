/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        colorForm: "1fr 2fr 1fr 2fr",
      },
    },
    fontFamily: {
      title: ["Gugi"],
    },
  },
  darkMode: "class",
  plugins: [],
};
