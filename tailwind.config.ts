import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="darkroom"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "393px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        canvas: "var(--canvas-substrate)",
        surface: {
          DEFAULT: "var(--surface-recessed)",
          raised: "var(--surface-raised)",
        },
        ink: {
          primary: "var(--ink-primary)",
          secondary: "var(--ink-secondary)",
          meta: "var(--ink-meta)",
        },
        hairline: {
          DEFAULT: "var(--border-hairline)",
          subtle: "var(--border-subtle)",
          active: "var(--border-active)",
        },
        cobalt: {
          DEFAULT: "var(--accent-cobalt)",
          hover: "var(--accent-hover)",
          glow: "var(--accent-glow)",
        },
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains)", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        full: "0px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
