const mongoose = require('mongoose')


const Url = mongoose.model('Url')

class Redirector {
  static async handle(req, res, next) {
    const shortened = req.params.shortened
    Url.findOne({ shortened }, { 'original': true }).exec((err, data) => {
      if (err) return res.send(err)
      if (!data) return next()
      else return res.redirect(`/redirecting?shortened=${shortened}`)
    })
  }
}


module.exports = Redirector
