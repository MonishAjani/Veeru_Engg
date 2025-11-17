import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
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
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      // Add perspective and transform utilities for 3D effects
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        'y-1': 'rotateY(1deg)',
        'y-2': 'rotateY(2deg)',
        'y-3': 'rotateY(3deg)',
        'y-5': 'rotateY(5deg)',
        'y-10': 'rotateY(10deg)',
        'y-0': 'rotateY(0deg)',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-none': {
          perspective: 'none',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.rotate-y-0': {
          transform: 'rotateY(0deg)',
        },
        '.rotate-y-1': {
          transform: 'rotateY(1deg)',
        },
        '.rotate-y-2': {
          transform: 'rotateY(2deg)',
        },
        '.rotate-y-3': {
          transform: 'rotateY(3deg)',
        },
        '.rotate-y-5': {
          transform: 'rotateY(5deg)',
        },
        '.rotate-y-10': {
          transform: 'rotateY(10deg)',
        },
      }
      addUtilities(newUtilities)
    }
  ]
}

export default config


