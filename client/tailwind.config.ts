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
      colors:{
        kz:{
          primary:"#141414",
          darkcard:"#1D1C1C",
          lightcard:"#282727",
          highlightl:"#30D5C8",
          secondary:"#D9D9D9",
          highlightd:"#0A427D",
        }
      }
    },
  },
  plugins: [],
}
export default config
