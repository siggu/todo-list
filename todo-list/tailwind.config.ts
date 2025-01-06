import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        nanumSquareBold: ['var(--font-nanumSquareBold)'],
        nanumSuqareRegular: ['var(--font-nanumSquareRegular)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
