/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
      },
      gridTemplateColumns: {
        layout: "minmax(500px, 2fr) 3fr",
      }, 
    },
  },
  plugins: [],
};
