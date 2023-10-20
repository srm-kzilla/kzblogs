import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Cal Sans", "sans-serif"],
      },
      boxShadow: {
        box: "0px 4px 88px -9px #000",
      },
      colors: {
        kz: {
          primary: "#141414",
          card: {
            light: "#1D1C1C",
            dark: "#282727",
          },
          secondary: "#D9D9D9",
          button: "#3AA39B",
          highlight: {
            light: "#30D5C8",
            dark: "#0A427D",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
