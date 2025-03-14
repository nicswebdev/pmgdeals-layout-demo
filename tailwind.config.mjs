/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "390px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1600px",
      "4xl": "1800px",
      "5xl": "2000px",
    },
    fontFamily: {
      inter: ["var(--font-inter)"],
      "open-sans": ["var(--font-open-sans)"],
    },
    extend: {
      colors: {
        primary: "#670000",
        "gray-dark": "#4A4A4A",
        red: "#F40000",
      },
    },
  },
  // Do not include tailwind default container
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        /**
         * Create custom container
         * Reference: https://stefvanlooveren.me/blog/custom-container-width-tailwind-css
         */
        ".container": {
          width: "100%",
          paddingLeft: "15px",
          paddingRight: "15px",
          marginLeft: "auto",
          marginRight: "auto",

          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "79.75vw", // 1692px of 2182px
          },
        },
      });
    },
  ],
};
