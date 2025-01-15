/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-main": "#1D1E30", // Main background color
        "brand-primary": "#01D676", // Primary brand color
        "surface": "#1E333C", // Accent or surface color for UI elements
        "text-light": "#FFFFFF", // Primary text color on dark backgrounds
        "text-muted": "#bdbdbd", // Secondary or muted text color
      },
      keyframes: {
        borderAnimation: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        border: "borderAnimation 3s linear infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["sunset", "dracula"],
  },
};
