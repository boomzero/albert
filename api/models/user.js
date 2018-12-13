const mongoose = require("mongoose")
const bcrypt = require('bcrypt')


const saltRounds = 10
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

userSchema.methods.validatePassword = function(candidate) {
  return candidate === this.password
}


const User = mongoose.model('User', userSchema)
module.exports = User
