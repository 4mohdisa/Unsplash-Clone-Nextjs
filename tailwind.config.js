/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textGray: "#111",
        textWhite: "#fff",
        bgGray: "#eee",
      },
    },
  },
  plugins: [],
};
