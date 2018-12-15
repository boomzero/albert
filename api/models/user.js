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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: String,
  email: {
    type: String,
    required: true
  },
})

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, saltRounds)
})

userSchema.methods.validatePassword = function(candidate) {
  return bcrypt.compareSync(candidate, this.password)
}


const User = mongoose.model('User', userSchema)
module.exports = User
