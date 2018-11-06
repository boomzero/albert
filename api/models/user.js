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

userSchema.pre('save', async function() {
  const hash = await bcrypt.hashSync(this.password, saltRounds)
  this.password = hash
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await (bcrypt.compareSync(candidatePassword, this.password))
}


const User = mongoose.model('User', userSchema)
module.exports = User
