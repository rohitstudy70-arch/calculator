import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#059669",
        },
        accent: {
          DEFAULT: "#D97706",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1F2937",
        }
      },
    },
  },
  plugins: [],
};

export default config;
