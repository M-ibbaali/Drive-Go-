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
            animation: {
                marquee: 'marquee 30s linear infinite',
            },
            keyframes: {
                marquee: {
                '0%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
}
