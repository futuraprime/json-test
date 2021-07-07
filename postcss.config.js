const pCSSEnv = require('postcss-preset-env');
const pCSSNested = require('postcss-nested');

module.exports = {
  plugins: [
    pCSSEnv({
      autoprefixer: { grid: false },
      features: {
        'custom-properties': {
          preserve: true,
        },
      },
    }),
    pCSSNested,
  ],
};
