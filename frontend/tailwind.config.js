/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stadium Green — primary brand color
        stadium: {
          50:  '#e8faf0',
          100: '#c3f1d6',
          200: '#8de4b4',
          300: '#4fd190',
          400: '#1abd70',
          500: '#00a854',
          600: '#008c45',
          700: '#007038',
          800: '#00542b',
          900: '#003a1e',
          950: '#001f0f',
        },
        // Gold — accent color
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#d4a017',
          600: '#b8860b',
          700: '#92680a',
        },
        // Dark — background scale
        dark: {
          50:  '#8fa3c0',
          100: '#617d9d',
          200: '#3c5878',
          300: '#1f3a56',
          400: '#112234',
          500: '#0a1628',
          600: '#081221',
          700: '#060e1a',
          800: '#040b14',
          900: '#030810',
          950: '#020608',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease-out both',
        'fade-in':    'fadeIn 0.5s ease-out both',
        'float':      'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ping-slow':  'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-down': 'slideDown 0.25s ease-out',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,168,84,0.25)' },
          '50%':      { boxShadow: '0 0 48px rgba(0,168,84,0.55)' },
        },
      },
    },
  },
  plugins: [],
}
