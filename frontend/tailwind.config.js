/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#2F3E46',
        darkGreen: '#354F52',
        normalGreen: '#52796F',
        softGreen: '#84A98C',
        cream: '#CAD2C5',
      },
    },
    plugins: [],
  }
}