/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Baloo Bhaijaan 2', 'cursive']
      }
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['active'],
      textColor: ['active']
    }
  },
  plugins: [],
}
