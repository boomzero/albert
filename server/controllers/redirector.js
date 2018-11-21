const mongoose = require('mongoose')


const Url = mongoose.model('Url')

class Redirector {
  static async handle(req, res, next) {
    Url.findOne({
      shortened: req.params.shortened
    }, {
      'original': true
    }).exec((err, data) => {
      if (err) return res.send(err)
      if (!data) return next()
      else return res.redirect(data.original)
    })
  }
}


module.exports = Redirector
