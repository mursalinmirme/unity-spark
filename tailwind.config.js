/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      colors: {
        primary: "#433EBE",
        second: "#45A5E1",
        accent: "#427AA1",
      },
    },
  },
  plugins: [require("daisyui")],
};
