const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    name:{
        type: String,
        required: 'Agrega tu nombre'
    },
    password: {
        type: String,
        required:true
    }

})

module.exports = mongoose.model('users', usersSchema)