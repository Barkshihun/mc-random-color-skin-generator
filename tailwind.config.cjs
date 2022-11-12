/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        colorForm: "2fr 5fr 2fr 5fr",
      },
    },
    fontFamily: {
      title: ["Gugi"],
    },
  },
  darkMode: "class",
  plugins: [],
};
