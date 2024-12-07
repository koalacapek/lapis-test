/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@spartan-ng/ui-core/hlm-tailwind-preset")],
  content: [
    "./src/**/*.{html,ts}", // Includes all HTML and TS files in src
    "./libs/**/*.{html,ts}", // Specifically includes app directory components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
