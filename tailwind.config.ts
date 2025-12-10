import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        swiss: {
          red: '#FF0000',
          white: '#FFFFFF',
          blue: '#0066CC',
          green: '#00AA44',
          gray: {
            50: '#F8F9FA',
            100: '#E9ECEF',
            200: '#DEE2E6',
            300: '#CED4DA',
            400: '#ADB5BD',
            500: '#6C757D',
            600: '#495057',
            700: '#343A40',
            800: '#212529',
            900: '#1A1A1A',
          }
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
