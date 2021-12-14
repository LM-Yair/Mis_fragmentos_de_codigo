const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: [ "last 2 version", "> 2%", "IE 10" ],
    }),
    require('postcss-fail-on-warn'),
  ]
}
