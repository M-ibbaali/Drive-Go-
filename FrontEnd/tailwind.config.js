/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: 'white',
        secondary: 'blue',
        tertiary: 'rgb(246 247 249)',
      },
    },
  },
  plugins: [],
}

