/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warp-bg': '#17101F',
        'warp-surface': '#201A2D',
        'warp-border': '#36294E',
        'warp-active': '#855DCD',
        'warp-text': '#FFFFFF',
        'warp-text-muted': '#9FA0A5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
