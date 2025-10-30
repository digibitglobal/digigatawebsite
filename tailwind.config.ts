// tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Helpers
 * - okVar: OKLCH via L/C/H channel vars with Tailwind alpha (<alpha-value>)
 * - fromVar: derive color from a full color var (oklch(from ...))
 *   (Modern Chrome/Edge/Safari support. If an older browser ignores OKLCH,
 *    your global.css sRGB fallbacks still style the UI.)
 */
const okVar = (name: string) =>
  `oklch(var(--${name}-l) var(--${name}-c) var(--${name}-h) / <alpha-value>)`;

const fromVar = (cssVar: string) =>
  `oklch(from var(${cssVar}) l c h / <alpha-value>)`;

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
    },
    extend: {
      /** ------------------------------------------------------------------
       * Colors
       * - Primary/brand is driven by OKLCH channels: --brand-l/c/h
       * - Full scale 50..950 resolved from global.css variables
       * - Surfaces & foregrounds mapped to neutral OKLCH vars
       * ------------------------------------------------------------------ */
      colors: {
        // Primary / brand (semantic alias)
        primary: okVar("brand"),
        brand: {
          DEFAULT: okVar("brand"),
          50: fromVar("--brand-50"),
          100: fromVar("--brand-100"),
          200: fromVar("--brand-200"),
          300: fromVar("--brand-300"),
          400: fromVar("--brand-400"),
          500: fromVar("--brand-500"),
          600: fromVar("--brand-600"),
          700: fromVar("--brand-700"),
          800: fromVar("--brand-800"),
          900: fromVar("--brand-900"),
          950: fromVar("--brand-950"),
        },

        // Status intents (driven by OKLCH channels you’ll see in global.css)
        success: okVar("success"),
        warning: okVar("warning"),
        danger: okVar("danger"),
        info: okVar("info"),

        // Surfaces & foregrounds (semantic)
        surface: fromVar("--surface-1-oklch"),
        "surface-2": fromVar("--surface-2-oklch"),
        "surface-3": fromVar("--surface-3-oklch"),
        "on-surface": fromVar("--fg-oklch"),
        "on-surface-2": fromVar("--fg2-oklch"),
      },

      /** Typography driven by global.css font stacks if desired */
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "sans-serif",
        ],
      },

      /** Use your global shadows/radius tokens */
      boxShadow: {
        sm: "var(--shadow-sm)",
        brand: "var(--shadow-md)",
        "brand-lg": "var(--shadow-lg)",
        DEFAULT: "var(--shadow-sm)",
        md: "var(--shadow-sm)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-lg)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "calc(var(--radius) + 2px)",
        xl: "calc(var(--radius) + 6px)",
        "4xl": "2rem",
      },

      /** Animations from your existing config */
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        gradient: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(0, 179, 164, 0.5)" },
          "100%": {
            boxShadow:
              "0 0 30px rgba(0, 179, 164, 0.8), 0 0 40px rgba(0, 179, 164, 0.4)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      /** Gradients (use brand vars) */
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand":
          "linear-gradient(135deg, var(--brand-500) 0%, var(--brand-400) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, oklch(var(--info-l) var(--info-c) var(--info-h)) 0%, oklch(var(--warning-l) var(--warning-c) var(--warning-h)) 100%)",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, var(--brand-500) 0px, transparent 50%), radial-gradient(at 80% 0%, var(--brand-400) 0px, transparent 50%), radial-gradient(at 0% 50%, oklch(var(--info-l) var(--info-c) var(--info-h)) 0px, transparent 50%), radial-gradient(at 80% 50%, oklch(var(--warning-l) var(--warning-c) var(--warning-h)) 0px, transparent 50%)",
      },

      /** Backdrop blur (keep your xs) */
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      // Optional attribute variants
      addVariant("theme", ':is([data-theme="light"] &, [data-theme="dark"] &)');
      addVariant("brand", ':is([data-brand] &)');
    }),
  ],
};

export default config;
