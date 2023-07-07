/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#3CB8E4',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
