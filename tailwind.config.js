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
      maxWidth: {
        'container': '1280px',
        'content': '952px',
      },
      spacing: {
        '134': '134px',
        '149': '149px',
        '82': '82px',
        '130': '130px',
      },
    },
  },
  plugins: [],
}