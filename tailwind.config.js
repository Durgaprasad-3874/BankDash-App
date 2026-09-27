/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4C49ED',
          50: '#EEEDFC',
          100: '#DEDCFA',
          200: '#B6B2F5',
          300: '#8D87F0',
          400: '#6C66E9',
          500: '#4C49ED',
          600: '#3B37D6',
          700: '#2E2BAE',
          800: '#211E86',
          900: '#16135E',
          gradientFrom: '#4C49ED',
          gradientTo: '#0A06F4',
        },
        ink: {
          DEFAULT: '#232323',
          soft: '#343C6A',
          muted: '#718EBF',
          faint: '#B1B1B1',
        },
        surface: {
          page: '#F5F7FA',
          card: '#FFFFFF',
          field: '#F5F7FA',
          border: '#E6EFF5',
        },
        accent: {
          teal: '#16DBCC',
          mint: '#1DD3B0',
          orange: '#FF9F43',
          pink: '#FE5C73',
          magenta: '#F55EA6',
          navy: '#232360',
          yellow: '#FFD57E',
        },
        danger: '#FF4B4A',
        success: '#16DBAA',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '26px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['28px', '36px'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '25px',
        full: '9999px',
      },
      spacing: {
        4.5: '18px',
        18: '72px',
        70: '280px',
        76: '304px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(19, 24, 64, 0.06)',
        cardHover: '0 12px 32px rgba(19, 24, 64, 0.1)',
        nav: '4px 0 24px rgba(19, 24, 64, 0.04)',
      },
      screens: {
        xs: '420px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
