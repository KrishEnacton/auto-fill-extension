/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom_white: '#F6F7FA',
        base: '#3CB8E4',
        primary_button: '#ECB34F',
        secondary_button: '#7DC337',
        custom_border: '#B5B5B5',
        custom_black: '#1E1E1E',
        base_text: '#003D5D',
        primary_text: '#593800',
        secondary_text: '#1F3E00',
      },
    },
  },
  plugins: [],
}
