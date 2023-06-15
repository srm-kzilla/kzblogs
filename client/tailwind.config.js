/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'kz-orange': '#FF5F5F',
    },
    screens:{
      'sm': {'max':'576px'},
      'md':{'max':'768px'},
      'lg':{'max':'1008'},
    },
    extend: {
      boxShadow:{
        'box-shadow': '0px 3px 16px rgba(255, 95, 95, 0.24)',
      },
      fontFamily:{
        'font-body':['cal-sans'],
      }
    },
  },
  plugins: [],
}
