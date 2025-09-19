/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
  './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  './pages/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  safelist: [
    'dark',
    'bg-primary-50',
    'bg-primary-950',
    'text-primary-950',
    'text-primary-200',
    'antialiased',
    'transition',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.stone, // Custom palette
        black: '#322D50',
        darkerblack: '#1F1C30',
        white: '#EFEDE6',
        purewhite: '#ffffff',
        darkwhite: '#E4DED2',
        herowhite: '#F5F3EF',
        herodark: '#3C3758'
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        heading: ['"Cabinet Grotesk"', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'],
        sm: ['.875rem', '1rem'],
        base: ['1.125rem', '1.75rem'],
        lg: ['1.125rem', '2rem'],
        xl: ['1.25rem', '2.125rem'],
        '2xl': ['1.5rem', '2rem'],
        '2xl-custom': ['2rem', '2.25rem'],
        '3xl': ['1.875rem', '2.375rem'],
        '4xl': ['2.25rem', '2.75rem'],
        '4xl-custom': ['4rem', '3.75rem'],
        '5xl': ['3rem', '3.125rem'],
        '6xl': ['3.75rem', '4.25rem'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
