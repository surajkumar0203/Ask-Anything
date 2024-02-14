/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height:{
        'custom-height-41':'41rem',
        'custom-per-h':'90%',
      },

    },
  },
  plugins: [],
}