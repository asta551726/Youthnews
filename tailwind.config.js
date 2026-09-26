/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#D7FF3D',
        panel: '#141414',
        base: '#0A0A0A',
      },
    },
  },
  plugins: [],
};
