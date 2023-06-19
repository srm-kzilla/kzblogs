/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'sm': {'max':'576px'},
      'md':{'max':'776px'},
      'lg':{'max':'1324'},
    },
    extend: {
      colors:{
        'kz-orange': '#FF5F5F',
        'kz-grey' : '#F9F9F9',
        'kz-green': '#56A86E',
        'kz-blue' : '#23BCFE',
      },
      boxShadow:{
        'box-shadow': '0px 3px 16px rgba(255, 95, 95, 0.24)',
      },
      fontFamily:{
        'font-body':['cal-sans'],
        josefin_sans: ['Josefin Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
