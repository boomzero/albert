const withCSS = require("@zeit/next-css")
const withPurgeCss = require('next-purgecss')
const optimizedImages = require('next-optimized-images')


module.exports = optimizedImages(withCSS(withPurgeCss()))
