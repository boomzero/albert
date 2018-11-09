const mongoose = require('mongoose')
const shortid = require('shortid')


const Url = mongoose.model('Url')


class UrlController {
  static async getAllOfUser(req, res) {
    try {
      const urls = await Url.find({ owner: req.params.username })
      res.json(urls)
    } catch (err) {
      res.send(err)
    }
  }

  static async getOne(req, res) {
    try {
      console.log(req.params.shortened)
      const url = await Url.findOne({ shortened: req.params.shortened })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }

  static async createOne(req, res) {
    try {
      const _shortened = req.body.customShortened ? req.body.customShortened : shortid.generate()
      const url = await Url.create({
        shortened: _shortened,
        original: req.body.original,
        owner: req.user ? req.user.username : "guest",
        expirationDate: req.body.expirationDate,
        password: req.body.password,
        restriction: {
          method: req.body.restrictionMethod,
          limitAllIpPerDay: req.body.restrictionLimit
        }
      })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }

  static async updateOne(req, res) {
    try {
      const url = await Url.findOneAndUpdate({shortened: req.params.shortened}, {
        expirationDate: req.body.expirationDate,
        password: req.body.password
      })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }

  static async deleteOne(req, res) {
    try {
      const url = await Url.findOneAndDelete({ shortened: req.params.shortened })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }
}


module.exports = UrlController
