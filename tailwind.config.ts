import type { Config } from 'tailwindcss';

/**
 * Tokens here are sampled from the live telcobright.com render, not invented:
 *
 *   container        1400px          (.elementor-section-boxed > .elementor-container)
 *   hero h1          Inter 72/72 700, letter-spacing -2px, #FFF
 *   section h2       Inter 48/48 700, letter-spacing -2px, #171717
 *   eyebrow          Inter 13px 400, letter-spacing 1px, #9CA3AF
 *   body             DM Sans 16/1.6, #5A5051
 *   brand gradient   linear-gradient(45deg, #EA580C, #4F46E5)
 *
 * The palette, the gradient and the two typefaces are the brand and are left
 * exactly as they were. What the 2026 refresh adds sits alongside them: a
 * depth scale (shadows tinted with the ink colour rather than flat black), an
 * easing curve, and the keyframes the motion layer uses.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E10713',
          50: '#FFF1F1',
          100: '#FFE1E1',
          200: '#FFC7C7',
          300: '#FF9E9E',
          400: '#FF4A45',
          500: '#E10713',
          600: '#BE0510',
          700: '#9B0610',
          800: '#800A13',
          900: '#5C0A10',
        },
        // The two stops of the gradient used across headings and buttons.
        grad: {
          from: '#EA580C',
          to: '#4F46E5',
        },
        ink: {
          DEFAULT: '#200F10',
          900: '#171717',
          700: '#3F3436',
          600: '#4B5563',
          500: '#5A5051',
          400: '#6B7280',
          300: '#9CA3AF',
          200: '#D1D5DB',
          100: '#F3F4F6',
          50: '#FAFAF9',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F0EFED',
          // A hair lighter than `muted`, for panels that sit on top of it.
          subtle: '#F7F6F4',
          dark: '#0B0708',
          // The card black the product tiles use.
          card: '#150D0E',
          darker: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { container: '1400px' },
      borderRadius: { '4xl': '2rem' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(45deg, #EA580C, #4F46E5)',
        // A washed-out version for hairlines, glows and hover tints.
        'brand-gradient-soft':
          'linear-gradient(45deg, rgba(234,88,12,.14), rgba(79,70,229,.14))',
        'brand-hairline':
          'linear-gradient(90deg, transparent, rgba(234,88,12,.7), rgba(79,70,229,.7), transparent)',
      },
      /*
       * Shadows are tinted with the ink brown (#200F10) instead of pure black.
       * On the warm white the site uses, black shadows read grey and dirty;
       * the tint keeps them in the same family as the rest of the palette.
       */
      boxShadow: {
        soft: '0 1px 2px rgba(32,15,16,.04), 0 6px 16px -8px rgba(32,15,16,.10)',
        card: '0 2px 4px rgba(32,15,16,.03), 0 12px 32px -12px rgba(32,15,16,.16)',
        lift: '0 8px 18px -6px rgba(32,15,16,.10), 0 24px 48px -20px rgba(32,15,16,.28)',
        glow: '0 10px 30px -12px rgba(234,88,12,.45), 0 12px 40px -16px rgba(79,70,229,.40)',
        header: '0 1px 0 rgba(255,255,255,.06), 0 12px 32px -20px rgba(0,0,0,.8)',
      },
      transitionTimingFunction: {
        // Slow, confident settle — used by every hover and panel transition.
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-in': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'panel-in': {
          '0%': { opacity: '0', transform: 'translateY(-6px) scale(.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-14px,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'panel-in': 'panel-in .18s cubic-bezier(.16,1,.3,1) both',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
