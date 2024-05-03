/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'false',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
    daisyui: {
    themes: [
      {
        nord: {
          ...require("daisyui/src/theming/themes")["nord"],
          "success": "#87d039",
          "error": "#e11d48",
          "neutral": "#3f3f46"
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
