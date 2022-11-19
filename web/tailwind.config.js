/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Rubik, sans-serif'
      },
      minWidth: {
        'min-w-200': '200px'
      },
      minHeight: {
        'min-h-50': '50px'
      },
      boxShadow:{
        shadowBotton: '0 10px  0'
      },
      colors: {
        gray: {
          100: '#eee'
        },
        turquoise: {
          800: '#243341',
          700: '#2c3e50',
          600: '#2C3E50',
          500: '#566573'
        },
        carmine:{
          700:'#712f26',
          500:'#8d3b30',
          800:'#5a2720'
        }
      }
    },
  },
  plugins: [],
}
