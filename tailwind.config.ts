import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef7f0',
          100: '#fdeadc',
          200: '#fad1b5',
          500: '#c8442d',
          600: '#a8351f',
          700: '#822817',
          900: '#3d1207',
        },
        ink: {
          900: '#1a1a1a',
          700: '#3d3d3d',
          500: '#6b6b6b',
          300: '#cfcfcf',
          100: '#f5f5f4',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
