const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withCSS = require("@zeit/next-css")
const withPurgeCss = require('next-purgecss')


module.exports = withPlugins([
  [optimizedImages, withCSS, withPurgeCss]
])
