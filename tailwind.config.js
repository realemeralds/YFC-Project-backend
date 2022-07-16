// /** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const plugin = require("tailwindcss/plugin");

// Rotate X utilities
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-x-20": {
      transform: "rotateX(20deg)",
    },
    ".rotate-x-40": {
      transform: "rotateX(40deg)",
    },
    ".rotate-x-60": {
      transform: "rotateX(60deg)",
    },
    ".rotate-x-80": {
      transform: "rotateX(80deg)",
    },
    ".rotate-y-20": {
      transform: "rotateY(20deg)",
    },
    ".rotate-y-40": {
      transform: "rotateY(40deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-80": {
      transform: "rotateY(80deg)",
    },
    ".cards-rotation": {
      transform: "rotate3d(1, 1, 0, 20deg)",
    },
    ".-cards-rotation": {
      transform: "rotate3d(-1, 1, 0, 20deg)",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      twoxsm: "444px",
      xsm: "515px",
      project: "700px",
      changingText: "768px",
      cv: "1168px",
      ...defaultTheme.screens,
    },
    letterSpacing: {
      tight: "-.015em",
    },
    extend: {
      height: {
        "half-screen": "50vh",
      },
      colors: {
        primary: "#E8E2CA",
        secondary: "#f19606",
        firstAccent: "#3b454e",
        secondAccent: "#806751",
        thirdAccent: "#282C24",
        fadedWhite: "#FAFBFB",
        borderWhite: "#D6D9DB",
        cardBG: "#E5DBB4",
      },
      gridTemplateColumns: {
        layout: "minmax(500px, 2fr) 3fr",
      },
      boxShadow: {
        elevated: "inset 0 0 2px 1px #DBFBFB;",
      },
      fontFamily: {
        futuraLight: ["FuturaLight", "SF Pro Display"],
      },
      boxShadow: {
        cards: "0px 2px #E5E5E5",
        cardsActive: "0px 8px #E5E5E5",
      },
    },
  },
  plugins: [rotateX],
};
