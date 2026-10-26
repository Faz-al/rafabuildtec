/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        rafa: {
          ink: "#171918",
          "ink-soft": "#242827",
          graphite: "#303432",

          body: "#4F5551",
          muted: "#737874",
          subtle: "#9A9E99",

          ivory: "#F4F2ED",
          paper: "#FAF9F6",
          stone: "#E8E6E0",
          concrete: "#D9D8D2",
          "concrete-dark": "#C9C8C1",

          metal: "#967A54",
          "metal-dark": "#7C6240",
        },
      },

      fontFamily: {
        display: [
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],

        body: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],

        editorial: [
          "Playfair Display",
          "Georgia",
          "serif",
        ],
      },

      maxWidth: {
        rafa: "1280px",
        "rafa-wide": "1440px",
        reading: "760px",
      },

      letterSpacing: {
        rafa: "0.28em",
        "rafa-wide": "0.4em",
      },

      boxShadow: {
        rafa: "0 10px 35px rgba(20, 22, 21, 0.06)",
        "rafa-card": "0 18px 60px rgba(20, 22, 21, 0.08)",
        "rafa-deep": "0 30px 90px rgba(20, 22, 21, 0.14)",
      },

      borderRadius: {
        rafa: "14px",
        "rafa-lg": "22px",
        "rafa-xl": "30px",
      },

      transitionTimingFunction: {
        rafa: "cubic-bezier(0.22, 1, 0.36, 1)",
        "rafa-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      minHeight: {
        screen: "100svh",
      },

      spacing: {
        "section-sm": "4.5rem",
        "section-md": "6rem",
        "section-lg": "9rem",
      },
    },
  },

  plugins: [],
};