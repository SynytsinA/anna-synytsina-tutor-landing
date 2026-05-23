
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#4338ca',    // indigo-700
        },
        secondary: '#ec4899', // pink-500
        accent: '#f59e0b',    // amber-500
        slate: {
          50: '#f8fafc',
          600: '#475569',
          900: '#0f172a',
        }
      },
      fontFamily: {
        heading: ["var(--font-nunito)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
        hand: ["var(--font-whimsical)", "cursive"], // Caveat
        whimsical: ["var(--font-whimsical)", "cursive"],
        cinzel: ["var(--font-alice)", "serif"],
        harry: ["var(--font-kelly)", "serif"],
      },
      borderRadius: {
        'hand': '255px 15px 225px 15px / 15px 225px 15px 255px',
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      },
      boxShadow: {
        'hard': '4px 4px 0px #0f172a',
        'hard-lg': '6px 6px 0px #0f172a',
        'hard-xl': '8px 8px 0px #0f172a',
        'hard-2xl': '12px 12px 0px #0f172a',
        'hard-orange': '4px 4px 0px #f97316',
        'hard-indigo': '0 8px 0px #4338ca',
      },
      animation: {
        'playful-wave': 'playfulWave 3s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'float-decor': 'floatDecor 6s ease-in-out infinite',
        'pop-in': 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s backwards',
        'draw-scribble': 'drawScribble 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'pop-in-centered': 'popInCentered 0.5s ease-out forwards',
        'float-node': 'floatNode 4s ease-in-out infinite',
        'pulse-green': 'pulseGreenScale 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        popInCentered: {
          '0%': { transform: 'translateX(-50%) scale(0)' },
          '100%': { transform: 'translateX(-50%) scale(1)' },
        },
        snowFall: {
          '100%': { transform: 'translate(0, 105vh)' },
        },
        floatNode: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGreenScale: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%': { transform: 'scale(2.5)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
