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

  static updateOne(req, res) {
    User.findOne({ username: req.user.username }, (err, user) => {
      if (err) return res.send(err)
      const { firstName, lastName, email, password } = req.body
      Object.assign(user, { firstName, lastName, email })
      if (password) user.password = password
      user.save()
      return res.json(user)
    })
  }
}


module.exports = UserController
