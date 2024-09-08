/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // קובץ זה מוודא שTailwind יחפש את מחלקות הCSS בקבצי הJS/JSX/TS/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
