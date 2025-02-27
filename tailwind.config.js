/** @type {import('tailwindcss').Config} */
export default {
  lightMode: "class", // Enables dark mode using a class
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
        matcha: 'var(--color-matcha)', //eto main accent
        accentRed: 'var(--color-accentRed)',
        darkBlue: 'var(--color-darkBlue)',
        white: 'var(--color-white)'
      }
    },
  },
  plugins: [],
}

