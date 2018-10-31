const mongoose = require("mongoose")


const Schema = mongoose.Schema

const counterSchema = new Schema({
  sequenceValue: {
    type: Number,
    required: true
  }
})


const Counter = mongoose.model("Counter", counterSchema)
module.exports = Counter
