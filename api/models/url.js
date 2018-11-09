const mongoose = require("mongoose")


const Schema = mongoose.Schema

const accessSchema = new Schema(
  {
    ipv4: {
      type: String,
      required: true
    },
    redirected: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
)

const restrictionSchema = new Schema({
  method: {
    type: String,
    required: true
  },
  limitAllIpPerDay: {
    type: Number,
    default: 86400
  },
  timeOutDuration: {
    type: Number,
    default: 5
  }
})

const urlSchema = new Schema({
  shortened: {
    type: String,
    required: true,
    unique: true
  },
  original: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  password: String,
  restriction: restrictionSchema,
  accesses: [accessSchema],
  active: {
    type: Boolean,
    default: true
  }
})


const Url = mongoose.model('Url', urlSchema)
module.exports = Url
