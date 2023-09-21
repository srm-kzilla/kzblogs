import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        body:["Cal Sans","sans-serif"],
      },
      boxShadow:{
        box:"0px 4px 88px -9px #000",
      },
      colors:{
        kz:{
          primary:"#141414",
          darkcard:"#1D1C1C",
          lightcard:"#282727",
          highlightl:"#30D5C8",
          secondary:"#D9D9D9",
          highlightd:"#0A427D",
          button:"#3AA39B",
        }
      }
    },
  },
  plugins: [],
}
export default config
