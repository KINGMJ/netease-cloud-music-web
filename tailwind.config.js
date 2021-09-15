const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        cabin: ['cabin', 'sans-serif'],
      },
      colors: {
        indigo: {
          50: '#F8F8FE',
        },
      },
      boxShadow: {
        md: '0 4px 6px -1px rgba(120, 120, 120, 0.12), 0 2px 4px -1px rgba(120, 120, 120, 0.06)',
        '2xl': '0 12px 12px 4px rgba(0, 0, 0, 0.12), 0 4px 8px 2px rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        xs: '16rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
