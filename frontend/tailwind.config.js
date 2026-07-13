/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0a0f1c',
          800: '#0d1424',
          700: '#0d1525',
          600: '#131c30',
          500: '#1a2744',
        }
      }
    },
  },
  plugins: [],
}
