/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Added for safety
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0A1929", // Dark Navy Background
          accent: "#00D9FF",  // Electric Cyan
          insight: "#0066CC", // Teal Blue
          light: "#FFFFFF",   // White
        }
      }
    },
  },
  plugins: [],
}