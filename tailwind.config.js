/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'green-lighter': 'hsl(148, 38%, 91%)',
        'green-medium': 'hsl(169, 82%, 27%)',
        'green-dark': 'hsl(169, 82%, 15%)',
        'red-hsl': 'hsl(0, 66%, 54%)',
        'grey-medium': 'hsl(186, 15%, 59%)',
        'grey-darker': 'hsl(187, 24%, 22%)',
      },
      fontFamily: {
        'karla': ['Karla', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
