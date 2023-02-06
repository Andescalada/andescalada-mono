/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("../../packages/ui/Theme/colors.cjs");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-[theme(colors.brand.primaryA)]",
    "bg-[theme(colors.brand.primaryB)]",
    "bg-[theme(colors.brand.secondaryA)]",
    "bg-[theme(colors.brand.secondaryB)]",
  ],
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
