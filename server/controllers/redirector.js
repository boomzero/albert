const mongoose = require('mongoose')


const Url = mongoose.model('Url')


class redirector {
  static async handle(req, res, next) {
    const result = await Url.findOne({ shortened : req.params.shortened }, 'original')
    result.exec( function (err, data) {
      if (err) return console.log(err)
      if (!data) return next()
      res.redirect(data.original)
    })
  }
}


module.exports = redirector
