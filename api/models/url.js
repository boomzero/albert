const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const saltRounds = 10
const Schema = mongoose.Schema

const accessSchema = new Schema({
  ipv4: {
    type: String,
    required: true
  },
  redirected: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
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
  owner: Schema.Types.ObjectId,
  expirationDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    select: false
  },
  restriction: {
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
  },
  accesses: {
    count: {
      type: Number,
      default: 0
    },
    list: [accessSchema]
  },
  active: {
    type: Boolean,
    default: true
  }
})

urlSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, saltRounds)
})

urlSchema.methods.validatePassword = function(candidate) {
  return bcrypt.compareSync(candidate, this.password)
}


const Url = mongoose.model('Url', urlSchema)
module.exports = Url
