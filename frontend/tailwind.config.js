/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      boxShadow : {
        searchBox: "0 0 0 4px rgba(234,100,217,0.1)",

      },

      borderColor : {
        searchBoxBorder: "rgba(234, 100, 217, 0.4)",
      }


    },
  },
  plugins: [],
}

