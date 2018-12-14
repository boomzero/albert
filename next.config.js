const withSass = require('@zeit/next-sass')
const optimizedImages = require('next-optimized-images')


module.exports = optimizedImages(withSass())
