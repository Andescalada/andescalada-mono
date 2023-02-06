/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("../../packages/ui/Theme/colors.cjs");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: "var(--rubik-font)",
    },
    extend: {
      colors,
    },
  },
  plugins: [],
};
