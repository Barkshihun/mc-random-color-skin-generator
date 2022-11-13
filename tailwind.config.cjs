/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        colorForm: "minmax(70px,2fr) minmax(50px,5fr) minmax(20px,2fr) minmax(50px,5fr)",
      },
    },
    fontFamily: {
      title: ["Gugi"],
    },
  },
  darkMode: "class",
  plugins: [],
};
