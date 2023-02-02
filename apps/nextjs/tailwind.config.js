/** @type {import('çtailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: "var(--rubik-font)",
    },
    extend: {
      colors: {
        primaryA: "#413d76",
        primaryB: "#c75f3d",
        secondaryA: "#e7b061",
        secondaryB: "#8cbae7",
        success: "#64BC26",
        warning: "#FAD202",
        error: "#EA1601",
        info: "#2C73DB",
        "grayscale-100": "#F7F8FC",
        "grayscale-200": "#ECEFF1",
        "grayscale-300": "#D4D6D7",
        "grayscale-400": "#B0BEC5",
        "grayscale-500": "#A0B1B9",
        "grayscale-600": "#607D8B",
        "grayscale-700": "#303f46",
        "grayscale-800": "#263238",
        "grayscale-900": "#1d262a",
        "1grayscale-000": "#13191c",
        "custom-black": "#121212",
      },
    },
  },
  plugins: [],
};
