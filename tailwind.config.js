// /** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

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
    },
  },
  plugins: [],
};
