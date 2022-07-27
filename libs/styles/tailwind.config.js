/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  // mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // gray: {
        //   light: colors.gray["100"],
        //   DEFAULT: colors.gray["200"],
        //   dark: colors.gray["300"],
        //   darker: colors.gray["500"],
        // },
        danger: {
          DEFAULT: colors.red["500"],
        },
      },
    },
  },
  plugins: [],
};
