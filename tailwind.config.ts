import type { Config } from "tailwindcss";
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee-reverse 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      screens:{
        'mid-lg': '1160px',
      }
    },
  },
  plugins: [tailwindScrollbar({ preferredStrategy: 'pseudoelements' })],
};
export default config;
