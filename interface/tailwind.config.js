/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      grey: "#949494",
      flax: "#E9D985",
      celadon: "#BCD8C1",
      zomp: "#439A86",
      cerulean: "#007991",
      "midnight-azure": "#222E50",
    },
    extend: {
      fontFamily: {
        opensans: ["OpenSans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      screens: {
        xs: "128px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
