/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        green: "#2E8686",
        white: "#ffffff",
        black: "#000000",
        grey: "#F0F0F0",
        darkGrey: "#555555",
        lightGrey: "#F8F8F8",
        silver: "#eee",
        warning: "#ffd200",
        danger: "rgb(250, 7, 7)",
        success: "rgb(118, 170, 14)",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
