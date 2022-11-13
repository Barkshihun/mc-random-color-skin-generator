/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        colorForm: "minmax(70px,2fr) minmax(50px,5fr) minmax(20px,2fr) minmax(50px,5fr)",
      },
      keyframes: {
        initCanvasLoad: {
          from: { filter: "brightness(0.8)" },
          to: { filter: "brightness(1)" },
        },
      },
      animation: {
        "init-canvas-load": "initCanvasLoad 500ms ease-in-out",
      },
    },
    fontFamily: {
      title: ["Gugi"],
    },
  },
  darkMode: "class",
  plugins: [],
};
