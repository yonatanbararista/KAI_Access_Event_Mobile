/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./partner-portal/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          blue: '#1A56DB',
          darkBlue: '#1340A0',
          lightBlue: '#EFF6FF',
          headerFrom: '#241A78',
          headerMid: '#38289F',
          headerTo: '#5035BA',
          orange: '#FF7A00',
          orangeDark: '#EA580C',
          gold: '#D97706',
          goldBg: '#FEF3C7',
          surface: '#FFFFFF',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#64748B',
          dark: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'kai-card': '0 8px 24px -4px rgba(36, 26, 120, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'kai-hover': '0 12px 32px -4px rgba(36, 26, 120, 0.14)',
      },
      borderRadius: {
        'kai': '18px',
        'kai-lg': '24px',
      }
    },
  },
  plugins: [],
}
