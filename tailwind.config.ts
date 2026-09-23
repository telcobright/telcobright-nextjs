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
 * The brand colours, the gradient and the two typefaces are fixed. Everything
 * that describes a *surface* — page background, text, hairlines, shadows — is a
 * CSS custom property rather than a literal, because the site now has two
 * themes. The light values are the ones above; `globals.css` holds both sets.
 *
 * Channels are stored as bare `R G B` triplets so Tailwind's `<alpha-value>`
 * keeps working: `bg-surface/70` and `border-ink-200/60` behave exactly as they
 * would against a hex literal.
 */
const themed = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
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
          DEFAULT: themed('--ink'),
          900: themed('--ink-900'),
          700: themed('--ink-700'),
          600: themed('--ink-600'),
          500: themed('--ink-500'),
          400: themed('--ink-400'),
          300: themed('--ink-300'),
          200: themed('--ink-200'),
          100: themed('--ink-100'),
          50: themed('--ink-50'),
        },
        surface: {
          DEFAULT: themed('--surface'),
          subtle: themed('--surface-subtle'),
          muted: themed('--surface-muted'),
          /** The near-black product tile. Dark in both themes, by design. */
          card: themed('--surface-card'),
          dark: themed('--surface-dark'),
          darker: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: { container: '1400px' },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(45deg, #EA580C, #4F46E5)',
        // A washed-out version for hairlines, glows and hover tints.
        'brand-gradient-soft':
          'linear-gradient(45deg, rgba(234,88,12,.14), rgba(79,70,229,.14))',
        'brand-hairline':
          'linear-gradient(90deg, transparent, rgba(234,88,12,.7), rgba(79,70,229,.7), transparent)',
      },
      /* Each theme defines its own depth; see `--shadow-*` in globals.css. */
      boxShadow: {
        soft: 'var(--shadow-soft)',
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
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
        /* The aurora layers: long, offset orbits, so the light behind the dark
           bands never repeats at an interval the eye can catch. */
        'aurora-a': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-5%,6%,0) scale(0.94)' },
        },
        'aurora-b': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1.05)' },
          '40%': { transform: 'translate3d(-8%,5%,0) scale(0.92)' },
          '75%': { transform: 'translate3d(7%,7%,0) scale(1.15)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s ease-out both',
        'panel-in': 'panel-in .18s cubic-bezier(.16,1,.3,1) both',
        drift: 'drift 9s ease-in-out infinite',
        'aurora-a': 'aurora-a 26s ease-in-out infinite',
        'aurora-b': 'aurora-b 34s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
