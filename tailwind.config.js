import { breakpoints } from './src/hooks/useBreakpoint';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      md: `${breakpoints.mobile}px`,
      lg: `${breakpoints.tablet}px`,
      xl: `${breakpoints.desktop}px`,
      '@1064': '1064px',
      '@1160': '1160px',
      '@800': '800px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'grow-line': {
          '0%': {
            height: '0%'
          },
          '100%': {
            height: '100%'
          }
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out',
        fadeInLeft: 'fadeInLeft 0.8s ease-out',
        fadeInRight: 'fadeInRight 0.8s ease-out'
      },
      // ... остальные настройки ...
    },
  },
  plugins: [],
};
