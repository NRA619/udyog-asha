const plugin = require("tailwindcss/plugin");

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
        'back-about': "url('/aboutback.jpg')",
        'blackbg': "url('/blackbg.png')",
        'whitebg': "url('/whitebg.jpg')",
        'wavebg': "url('/wave-back.png')",
        'wavebgred': "url('/wave-light.jpg')",
        'redback': "url('/redback.png')",
        'blueback': "url('/blueback.png')",
        'bluebg' : "url('/bluebg.jpg')",
        'emptybg' : "url('/emptybg.jpg')",
        'address' : "url('/address.jpg')",
        'feed': "url('/feed.jpg')",
        'addressfinal': "url('/addressfinal.jpg')",
        'cartfinal2': "url('/cartfinal2.png')",
        'forgetpassword': "url('/forgetpassword.png')",
        'breakbg': "url('/breakbg.jpg')",
        'bsupport': "url('/bsupport.jpg')",
        'registration': "url('/registration.jpg')",
        'pmedia': "url('/pmedia.jpg')",
        'marketing': "url('/marketing.png')",
      }),
      width: {
        '6/7': '87.7142857%',
      },
      fontSize: {
        'xxs': '.5rem',
      },
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
  plugins: [require("tailwindcss-glow")()],
};
