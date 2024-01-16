/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': "'Poppins', sans-serif",
        'inter': "'Inter', sans-serif"
      },
      colors: {
        'primary': '#248479',
        'second': '#76C6A2'
      }
    },
  },
  plugins: [require("daisyui")],
}

