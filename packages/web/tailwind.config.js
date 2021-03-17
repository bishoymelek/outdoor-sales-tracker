const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': '"HK Grotesk",ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      tsri: '#36ADDF',
      gray: colors.coolGray,
      white: "#fff",
      blue: {
        DEFAULT: '#0E9FED',
        light: '#C0E9FF'
      },
      yellow: {
        DEFAULT: '#F5FF64',
        light: '#FBFFC0'
      },
      black: {
        DEFAULT: '#000000',
        light: '#D6D5D5'
      },
      red: {
        DEFAULT: '#FFBBA6',
        light: '#FFE8E0'
      },
      violet: {
        DEFAULT: '#B973FF',
        light: '#E7D7FF'
      },
      green: {
        DEFAULT: '#6BE59E',
        light: '#D0F6E0'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
