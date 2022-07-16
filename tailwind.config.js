/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xsm: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        orange: '#ef8336',
        lightOrange: '#feead6',
        lighterOrange: '#FEF5EA',
        lightBrown: '#f1e8d6',
        lighterBrown: '#fbf7f3',
        brown: '#a29071',
        darkBrown: '#26282c',
        white: '#ffffff',
        black: '#000000',
        grey: '#333',
        darkGrey: '#26282C',
        lightGrey: '#f7f7f7',
        silver: '#eee',
        warning: '#ffd200',
        danger: 'rgb(250, 7, 7)',
        success: 'rgb(118, 170, 14)',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
