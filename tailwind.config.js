/** @type {import('tailwindcss').Config} */
module.exports = {
purge: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.css'],
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    boxShadow: {
      title: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      form: "rgba(0, 0, 0, 0.35) 0px 5px 15px;"
    }
  },
  plugins: [],
}