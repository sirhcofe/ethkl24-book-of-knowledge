import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mnGreen: "#084C61",
        jasper: "#DB504A",
        saffron: "#E3B505",
        violet: "#4A2545",
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
        chewy: ["var(--font-chewy)"],
      },
      screens: {
        xs: "460px",
      },
    },
  },
  plugins: [],
};
export default config;
