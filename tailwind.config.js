import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        mulish: ["var(--font-mulish)"],
      },
      colors: {
        pink: {
          500: "#FA0F9C",
        },
        grey: {
          700: "#0E0E0F",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-scrollbar")({ nocompatible: true })],
};
