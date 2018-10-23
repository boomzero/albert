const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    

const userSchema = new Schema({ 
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
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
        unique: true,
        required: true
    },
});



mongoose.model('User', userSchema);
