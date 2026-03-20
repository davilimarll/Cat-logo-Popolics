import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#09080a",
          panel: "#151218",
          border: "#2b2330",
          text: "#e8e1ea",
          muted: "#b0a8b6",
          fire: "#cc452a",
          ember: "#8f2618",
          steel: "#667180",
          earth: "#6f5238"
        }
      },
      boxShadow: {
        ember: "0 0 30px rgba(204, 69, 42, 0.18)",
        steel: "0 0 30px rgba(102, 113, 128, 0.2)"
      }
    }
  },
  plugins: []
} satisfies Config;
