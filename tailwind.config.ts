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
          50: '#f8fafd',
          100: '#eef2f7',
          200: '#dce4ee',
          300: '#b8c7d9',
          400: '#94a7c0',
          500: '#7289a7',
          600: '#5a6d8c',
          700: '#485873',
          800: '#3a4659',
          900: '#2c3544'
        },
        brand: {
          blue: '#2563eb',
          'blue-dark': '#1e40af',
          gray: '#374151',
          black: '#0f172a'
        }
      },
      backgroundImage: {
        'gradient-metal': 'linear-gradient(to bottom, #1e293b, #111827)',
        'gradient-blue': 'linear-gradient(to bottom, #1e40af, #2563eb)',
        'gradient-card': 'linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(12, 18, 32, 0.8))',
        'gradient-navy': 'linear-gradient(180deg, #0c1220 0%, #111827 50%, #1e293b 100%)'
      },
      boxShadow: {
        'metal': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
      }
    }
  },
  plugins: []
}

export default config


