const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const accessSchema = new Schema({
    ip: {
        type: String, 
        required: true
    },
    timestamp: true,
    redirected: {
        type: Boolean,
        required: true,
    },
});

const restrictionSchema = new Schema({
    method: {
        type: String,
        required: true,
    },
    limitAllIpPerDay: {
        type: Number,
        default: 3,
    },
    timeOutDuration: {
        type: Number,
        default: 5,
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
    expirationDate: {
        type: Date, 
        required: true
    },
    restriction: restrictionSchema,
    password: String,
    accesses: [accessSchema],
    owner: {
        type: Schema.types.ObjectId, 
        required: true
    },
});

mongoose.model('Url', urlSchema);