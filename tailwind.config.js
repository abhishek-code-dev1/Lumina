/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#C5A880',
          500: '#B08D5B',
          600: '#8C6F42'
        },
        dark: {
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        }
      }
    },
  },
  plugins: [],
}
