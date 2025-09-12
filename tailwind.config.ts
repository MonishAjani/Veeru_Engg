import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50: '#f6f7f9',
          100: '#e9edf2',
          200: '#cfd8e3',
          300: '#a5b3c6',
          400: '#788aa2',
          500: '#586b85',
          600: '#45546a',
          700: '#3a4658',
          800: '#343c4a',
          900: '#2f3440'
        },
        brand: {
          blue: '#1e3a8a',
          gray: '#374151',
          black: '#0b0f14'
        }
      }
    }
  },
  plugins: []
}

export default config


