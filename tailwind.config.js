/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'vite';
import typography from '@tailwindcss/typography';
export default defineConfig ({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [typography],
})