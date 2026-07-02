export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        haloBlue: "#4cc9f0",
        haloBlueSoft: "#72e6ff",
        haloGlow: "rgba(76, 201, 240, 0.35)",
      },
      boxShadow: {
        halo: "0 0 15px rgba(76, 201, 240, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
