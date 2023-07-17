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
        'kz-orange':'#e94560',
        'kz-grey' : '#F9F9F9',
        'kz-textgrey' : '#8E8787',
        'kz-textblue' : '#4e4feb',
        'kz-lightblue': '#569ed6',
        'kz-deepblue' : '#3b3ba6',
      },
      boxShadow:{
        'box-shadow': '0px 3px 16px rgba(255, 95, 95, 0.24)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'card-shadow': 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;'
      },
      fontFamily:{
        body:['cal-sans', 'sans-serif'],
        josefinSans: ['Josefin Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],  
}
