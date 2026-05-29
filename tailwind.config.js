/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        neon: {
          blue: 'rgb(0 243 255 / <alpha-value>)',
          purple: 'rgb(112 0 255 / <alpha-value>)',
          pink: 'rgb(255 0 234 / <alpha-value>)',
          green: 'rgb(0 255 135 / <alpha-value>)',
        },
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 243, 255, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 243, 255, 0.6)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
