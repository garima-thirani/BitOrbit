/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orbit: {
          background: '#070B18',
          surface: '#111827',
          card: '#182134',
          primary: '#6C63FF',
          secondary: '#7B61FF',
          accent: '#4FD1FF',
          success: '#34D399',
          warning: '#FBBF24',
          text: '#F9FAFB',
          muted: '#94A3B8',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(108, 99, 255, 0.26)',
        'accent-glow': '0 0 34px rgba(79, 209, 255, 0.22)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      keyframes: {
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-180% 0' },
          '100%': { backgroundPosition: '180% 0' },
        },
      },
      animation: {
        orbit: 'orbit 36s linear infinite',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
