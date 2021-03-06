const mongoose = require('mongoose')


const User = mongoose.model('User')

class UserController {
  static async getOne(req, res) {
    try {
      const user = await User.findOne({ username: req.user.username })
      res.json(user)
    } catch (err) {
      res.send(err)
    }
  }

  static async createOne(req, res) {
    try {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      res.json(user)
    } catch (err) {
      res.send(err)
    }
  }

  static async updateOne(req, res) {
    try {
      const user = await User.findOneAndUpdate({ username: req.user.username }, {
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      res.json(user)
    } catch (err) {
      res.send(err)
    }
  }
}


module.exports = UserController
