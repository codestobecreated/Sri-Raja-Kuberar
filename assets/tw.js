// Tailwind CDN theme config (load right after https://cdn.tailwindcss.com)
// Theme: "Kumkum & Gold" – deep sindoor maroon, turmeric gold, warm ivory, sanctum night.
// (palette names kept as temple/gold/maroon so every page re-themes automatically)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        temple: { 50: '#fdf4f1', 100: '#f9e3dc', 200: '#f0c0b2', 300: '#e2917c', 400: '#cc624a', 500: '#b03f2a', 600: '#922b1d', 700: '#781f17', 800: '#5e1712', 900: '#3e0f0c' },
        gold: { 50: '#fffaeb', 100: '#fdefc6', 200: '#fbdd8c', 300: '#f6c453', 400: '#eeaa2c', 500: '#d98c12', 600: '#b46c0c', 700: '#8c520e' },
        maroon: { 500: '#c2410c', 600: '#9a3412', 700: '#7c2d12' },
        night: { 800: '#2a120d', 900: '#180a07', 950: '#0f0604' },
        cream: '#fdf8ef', ivory: '#fffdf8', sandal: '#f5e9d3'
      },
      fontFamily: {
        sans: ['Manrope', '"Noto Sans Tamil"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', '"Noto Serif Tamil"', 'Georgia', 'serif'],
        tamil: ['"Noto Serif Tamil"', 'serif']
      },
      boxShadow: { soft: '0 18px 40px -18px rgba(94,23,18,.35)', glow: '0 0 60px -10px rgba(238,170,44,.55)' },
      keyframes: { spin: { to: { transform: 'rotate(360deg)' } }, flicker: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: .85, transform: 'scale(.96) translateY(1px)' } }, marquee: { to: { transform: 'translateX(-50%)' } } },
      animation: { 'spin-slow': 'spin 90s linear infinite', flicker: 'flicker 1.8s ease-in-out infinite', marquee: 'marquee 40s linear infinite' }
    }
  }
};
