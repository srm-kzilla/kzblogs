/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        'font-body':['cal-sans'],
        Josefin_Sans: ['Josefin_Sans'],
        Outfit: ['Outfit'],
      }
    },
  },
  plugins: [],
}
