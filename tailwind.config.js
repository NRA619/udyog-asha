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
      spacing: {
        '128': '32rem',
        '156': '48rem',
        '256': '60rem',
        '500': '80rem',
        '88' : '22rem',
      },
      height: {
        '0.1': '0.05rem'
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
        'yellowback': "url('/yellowback.jpg')",
        'bluebg' : "url('/bluebg.jpg')",
        'emptybg' : "url('/emptybg.jpg')",
        'breakbg' : "url('/breakbg.jpg')",
        'address' : "url('/address.jpg')",
        'cart': "url('/cart.jpg')",
        'cartbag': "url('/cartbag.jpg')",
        'cartfinal': "url('/cartfinal.jpg')",
        'feedback': "url('/feedback.jpg')",
        'feed': "url('/feed.jpg')",
        'addressfinal': "url('/addressfinal.jpg')",
        'cartfinal2': "url('/cartfinal2.png')",
        'forgetpassword': "url('/forgetpassword.png')",
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
      display: ['group-hover'],
    },
  },
  plugins: [
    require("tailwindcss-glow")(),
    require('@tailwindcss/forms'),],
};
