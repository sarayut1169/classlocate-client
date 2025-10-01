/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'sans-serif'], // หรือ Inter ก็ได้
      },
      colors: {
        blue: {
          50: '#ebf5ff',
          100: '#d6eaff',
          600: '#1e40af',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
        },
      },
    },
  },
  plugins: [],
}