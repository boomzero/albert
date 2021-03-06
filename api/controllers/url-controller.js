const mongoose = require('mongoose')
const requestip = require('request-ip')
const shortid = require('shortid')


const Url = mongoose.model('Url')

const isUrlOwner = async (user, shortened) => {
  if (!user) return false
  const url = await Url.findOne({ shortened })
  return url.owner.toString() === user.id
}

class UrlController {
  static async getOne(req, res) {
    try {
      const url = await Url.findOne({ shortened: req.params.shortened })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }

  static async validatePassword(req, res) {
    try {
      Url.findOne({ shortened: req.params.shortened }, { password: true }).exec(async (err, url) => {
        if (!url.password) return res.json({ success: true })
        return res.json({ success: await url.validatePassword(req.body.password) })
      })
    } catch (err) {
      res.send(err)
    }
  }

  static async getAllOfUser(req, res) {
    try {
      const urls = await Url.find({
        owner: req.user.id
      })
      res.json(urls)
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
        owner: req.user ? req.user.id : null,
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
      if (!isUrlOwner(req.user, req.params.shortened))
        return res.status(403).json({
          success: false
        })
      const url = await Url.updateOne({
        shortened: req.params.shortened
      }, {
        expirationDate: req.body.expirationDate,
        password: req.body.password
      })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }

  static async logAccess(req, res) {
    try {
      const newAccess = {
        ipv4: requestip.getClientIp(req),
        redirected: req.body.redirected
      }
      await Url.updateOne({ shortened: req.params.shortened }, {
        $inc: { 'accesses.count': 1 },
        $push: { 'accesses.list': newAccess }
      })
      res.json({ success: true })
    } catch (err) {
      res.send(err)
    }
  }

  static async deleteOne(req, res) {
    try {
      if (!isUrlOwner(req.user, req.params.shortened))
        return res.status(403).json({
          success: false
        })
      const url = await Url.deleteOne({
        shortened: req.params.shortened
      })
      res.json(url)
    } catch (err) {
      res.send(err)
    }
  }
}


module.exports = UrlController
