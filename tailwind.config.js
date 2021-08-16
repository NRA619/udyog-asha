module.exports = {
  purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        large: "3rem",
      },
      backgroundImage: (theme) => ({
        "back-image": "url('/1.jpg')",
        'pb-image': "url('/pb.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      borderColor: ["hover"],
      borderWidth: ["hover"],
      transitionTimingFunction: ["hover"],
      divideWidth: ["hover"],
      divideColor: ["hover"],
      fontWeight: ["hover"],
      mixBlendMode: ["hover"],
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [],
};
