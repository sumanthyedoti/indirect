/** @type {import('tailwindcss').Config} */
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
      },
    },
  },
  plugins: [],
};
