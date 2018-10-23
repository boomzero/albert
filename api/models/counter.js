const mongoose = require('mongoose')


const Schema = mongoose.Schema

const counterSchema = new Schema({
  sequenceValue: {
    type: Number,
    required: true
  }
})


mongoose.model('Counter', counterSchema)
