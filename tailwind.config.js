/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette
        'space-black': '#080c14',
        'space-dark': '#0d1117',
        'space-surface': '#111827',
        'space-card': '#131f2e',
        'space-border': '#1e2d3d',
        // Accent
        'aero-cyan': '#38bdf8',
        'aero-cyan-dim': '#0ea5e9',
        'aero-indigo': '#818cf8',
        'aero-glow': '#38bdf830',
        // Text
        'text-primary': '#f0f4f8',
        'text-secondary': '#94a3b8',
        'text-muted': '#4b6380',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
        'slide-left': 'slideLeft 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56,189,248,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(56,189,248,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'aero': '0 0 30px rgba(56,189,248,0.15)',
        'aero-strong': '0 0 60px rgba(56,189,248,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
