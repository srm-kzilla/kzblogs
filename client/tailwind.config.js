/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'kz-dark-grey':'#151319',
        'kz-orange': '#FF5F5F',
        'kz-grey' : '#F9F9F9',
        'kz-green': '#56A86E',
        'kz-blue' : '#23BCFE',
      },
      boxShadow:{
        'box-shadow': '0px 3px 16px rgba(255, 95, 95, 0.24)',
        'card-shadow': 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;'
      },
      fontFamily:{
        body:['cal-sans', 'sans-serif'],
        josefin_sans: ['Josefin Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],  
}
