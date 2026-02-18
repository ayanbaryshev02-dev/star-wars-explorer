/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F6F6F6', 
        accent: '#F7FFB8', 
      },
      fontFamily: {
        'avant-garde': ['"ITC Avant Garde Gothic"', 'sans-serif'],
        'stellar': ['Stellar', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
        'content': '952px',
      },
    },
  },
  plugins: [],
}