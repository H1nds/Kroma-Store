/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                
                kroma: {
                    milk: '#fdfdf1', 
                    grayblue: '#2b323f', 
                    accent: '#fca5a5', 
                }
            },
            fontFamily: {
                
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}