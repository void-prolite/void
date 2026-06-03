/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#f5f2eb',
          soft: '#faf8f5',
          active: '#fdfcfa',
        },
        ink: {
          DEFAULT: '#0f0c08',
          muted: '#3c362d',
        },
        accent: {
          sepia: '#8B6F47',
          violet: '#a855f7',
          coral: '#ff4b3e',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}