const withCss = require('@zeit/next-css');


module.exports = withCss({
  generateEtags: false,
  maxInactiveAge: 60 * 1000
});
