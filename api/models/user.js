const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function(next) {
  let hash = await bcrypt.hash(this.password, 8)
  if (err) {
    return next(err)
  } else {
    this.password = hash
    return next()
  }
})

const User = mongoose.model("User", userSchema)
module.exports = User
