/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kz: {
          "dark-grey": "#151319",
          purple: "#37379B",
          grey: "#8F8F8F",
          blue: "#569ED6",
          pink: "#E94560",
          "lt-purple": "#4E4FEB",
          "dull-purple": "rgba(78, 79, 235, 0.4)",
          "purp-2": "#232238",
        },
      },
      boxShadow: {
        "box-shadow": "0px 3px 16px rgba(0, 0, 0, 0.24)",
        "card-shadow":
          "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
      },
      fontFamily: {
        body: ["cal-sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
