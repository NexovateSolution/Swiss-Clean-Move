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
          red: '#E31E24',
          softRed: '#FFE9EA',
          white: '#FFFFFF',
          bg: '#FFFFFF',
          section: '#F7F9FB',
          text: '#111111',
          body: '#5A5F66',
          border: '#E6E8EC',
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
      borderRadius: {
        xl: '12px',
        '2xl': '16px'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(17, 17, 17, 0.06)',
        subtle: '0 1px 2px rgba(17, 17, 17, 0.06)',
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
