/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
    colors: {
      "bg-main": "#1D1E30", // Main background color
      "brand-primary": "#01D676", // Primary brand color
      "surface": "#1E333C", // Accent or surface color for UI elements
      "text-light": "#FFFFFF", // Primary text color on dark backgrounds
      "text-muted": "#bdbdbd", // Secondary or muted text color
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["sunset", "dracula"],
  },
};
