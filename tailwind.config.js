/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['sans-serif'],
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
      },
      colors: {
        matcha: '#9F9FE0',
        accentRed: '#F64D54',
        darkBlue: '#090517',
        contrastBlue: ''
      }
    },
  },
  plugins: [],
}

