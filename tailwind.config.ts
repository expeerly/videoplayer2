import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['var(--font-mulish)'],
      },
      backgroundImage: {
        'blue-left-gradient': 'linear-gradient(90deg, #4B49EB 40.5%, rgba(75, 73, 235, 0) 100%)',
        'blue-right-gradient': 'linear-gradient(270deg, #4B49EB 40.5%, rgba(75, 73, 235, 0) 100%)',
        'white-left-gradient': 'linear-gradient(90deg, #FFFFFF 40.5%, rgba(255, 255, 255, 0) 100%)',
        'white-right-gradient':
          'linear-gradient(270deg, #FFFFFF 40.5%, rgba(255, 255, 255, 0) 100%)',
      },
      colors: {
        pink: {
          500: '#FA0F9C',
          600: '#DE1777',
          700: '#C6186B',
        },
        'light-gray': '#F7F7F7',
        gray: {
          300: '#D1D1D4',
          400: '#BBB9BF',
          700: '#0E0E0F',
          500: '#8D8B94',
        },
        blue: {
          500: '#4B49EB',
        },
        navy: {
          100: '#EFEDF4',
        },
        yellow: {
          500: '#FFC122',
        },
      },
      fontSize: {
        h1: [
          '24px',
          {
            lineHeight: '1.25',
            fontWeight: '700',
          },
        ],
        h2: [
          '24px',
          {
            lineHeight: '1.25',
            fontWeight: '500',
          },
        ],
        body: [
          '16px',
          {
            lineHeight: '1.5',
            fontWeight: '400',
          },
        ],
      },
      screens: {
        mobileS: '320px',
        mobileM: '375px',
        mobileL: '425px',
        'mid-tablet': '550px',
        'mid-lg': '1200px',
      },
    },
  },
  plugins: [tailwindScrollbar({ preferredStrategy: 'pseudoelements' })],
};
export default config;
