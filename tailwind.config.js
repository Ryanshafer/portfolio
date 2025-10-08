/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

const hexToRgba = (hex, alpha = 1) => {
  if (typeof hex !== 'string') return hex;
  const normalized = hex.replace('#', '');
  if (![3, 6].includes(normalized.length)) return hex;

  const value =
    normalized.length === 3
      ? normalized
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : normalized;

  const int = Number.parseInt(value, 16);
  if (Number.isNaN(int)) return hex;

  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
        herodark: '#3C3758',
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
      typography: (theme) => ({
        resume: {
          css: {
            maxWidth: 'none',
            // kill all color variables so elements inherit from parent
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
            p: {
              maxWidth: '65ch',
            },
            h2: {
              '@apply my-0': {},
              '@screen md': {
                '@apply mb-24': {},
              },
            },
            
            h3: {
              '@apply text-xl font-bold': {},
            },
            ul: {
              maxWidth: '65ch',
              '@apply list-disc pl-3 text-base space-y-0': {},
            },
            li: {
              '@apply text-base mt-0 pb-2': {},
            },
            strong: {
              '@apply font-bold': {},
            },
            a: {
              '@apply text-blue-600 underline hover:text-blue-800': {},
            },
          },
        },
        'case-study': {
          css: {
            maxWidth: 'none',
            // kill all color variables so elements inherit from parent
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
            h2: {
              '@apply text-2xl-custom font-heading font-bold mt-6 mb-0': {},
              maxWidth: theme('maxWidth.lg'),
              '&:first-child': {
                marginTop: '1.5rem',
              },
              '@screen md': {
                '@apply mb-24': {},
              },
              '@screen lg': {
                maxWidth: '23rem',
                '&:first-child': {
                  marginTop: '1.5rem',
                },
              },
            },
            p: {
              '@apply text-lg pb-0 my-3': {},
              '@screen md': {
                '@apply my-6': {},
              },
            },
            hr: {
              borderColor: hexToRgba(theme('colors.black'), 0.3),
              '.dark &': {
                borderColor: hexToRgba(theme('colors.white'), 0.5),
              },
              '@apply mt-0 mb-0': {},
              '@screen lg': {
                '@apply my-8 mb-6': {},
              },
            },
            ul: {
              '@apply list-disc pl-4 my-2': {},
              
            },
            ol: {
              '@apply my-2': {},
              
            },
            li: {
              '@apply py-2 text-lg my-0': {},
            },
            a: {
              '@apply underline hover:underline-offset-2': {},
            },
          },
        },
        summary: {
          css: {
            // kill all color variables so elements inherit from parent
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
            ul: {
              '@apply pl-8 lg:pl-0': {},
            },
            li: {
              '@apply list-none ml-0 relative pb-2 text-base ps-0': {},
            },
            'li::before': {
              '@apply font-bold absolute left-[-1.75rem]': {},
              content: '"→"',
              color: 'inherit',
            },
          },
        },
        thoughts: {
          css: {
            // kill all color variables so elements inherit from parent
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-counters': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-quotes': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-code': 'inherit',
            '--tw-prose-pre-code': 'inherit',
            '--tw-prose-pre-bg': 'inherit',
            '--tw-prose-th-borders': 'inherit',
            '--tw-prose-td-borders': 'inherit',
            h2: {
              '@apply text-2xl-custom font-heading font-bold mt-6 mb-2': {},
            },
            a: {
              '@apply underline hover:underline-offset-2': {},
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
