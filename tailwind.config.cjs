/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
   ], theme: {
      extend: {},
   },
   plugins: [require('tailwindcss-text-balance'), require('daisyui')],
   daisyui: {
      themes: 'black'
      , dark: 'black',
   },
}
