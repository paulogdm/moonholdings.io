module.exports = (phase, { defaultConfig }) => {
  // ✅ Put the require call here.
  const withTypescript = require('@zeit/next-typescript');
  const withCSS = require('@zeit/next-sass');

  return withTypescript(withCSS({target: 'serverless'}));
};
