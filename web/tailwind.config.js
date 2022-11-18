/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: 'Rubik, sans-serif'
      },
      width:{
        w-2full: 200%
      },
      colors:{
      gray:{
        900: '#eee'
      },
      turquoise:{
        100: '#243341',
        200: '#2c3e50',
        300: '#2C3E50',
        500: '#566573'
      }
}
    },
  },
  plugins: [],
}
