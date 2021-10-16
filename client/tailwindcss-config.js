module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "header-pattern": "url('/src/assets/imgs/background-header.png')",
      },
      colors: {
        "primary-dark": "#3A4374",
        "secondary-dark": "#647196",
        "primary-light": "#F7F8FD",
        "secondary-light": "#F1F4FF",
        "tertiary-light": "#F2F4FF",
        "tertiary-dark": "#4661E6",
        neutral: "#AD1FDA",
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
        "btn-hover": "#C659F6",
      },
      gridTemplateColumns: {
        body: "255px 1fr",
        card: "auto 1fr auto",
      },
      fontFamily: {
        display: ["Jost", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
