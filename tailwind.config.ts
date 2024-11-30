import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-merriweather)'], // Set as default font
        merriweather: ['var(--font-merriweather)'],
      },
      colors: {
        primary: {
          DEFAULT: '#9aab89', // Soft rose pink
          hover: '#9aab89'    // Slightly darker on hover
        },
        secondary: {
          DEFAULT: '#c6d6c6', // Soft sage green
          hover: '#c6d6c6'    // Slightly darker on hover
        },
        accent: {
          DEFAULT: '#9aab89', // Soft dusty blue
          hover: '#9aab89'    // Slightly darker on hover
        },
        background: '#fffff0' // Almost white background
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;