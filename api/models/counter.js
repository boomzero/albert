const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const counterSchema = new Schema({
    _id: {
        unique: true
    },
    sequence_value: {
        type: Number, 
        required: false
    }
});

mongoose.model('Counter',counterSchema);