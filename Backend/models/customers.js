const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim:true
    },
    company: {
        type: String,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim:true
    }

})

module.exports = mongoose.model('customers', customersSchema)