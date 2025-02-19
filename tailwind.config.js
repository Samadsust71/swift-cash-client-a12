/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        "bg-main": "#1D1E30", // Main background color
        "brand-primary": "#04EA8E", // Primary brand color
        "surface": "#1E333C", // Accent or surface color for UI elements
        "text-light": "#FFFFFF", // Primary text color on dark backgrounds
        "text-muted": "#bdbdbd", // Secondary or muted text color
      },
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [daisyui,require('tailwind-scrollbar')({ nocompatible: true })],
  daisyui: {
    themes: ["sunset", "dracula"],
  },
};
