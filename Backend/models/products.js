const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type:Number
    },
    image : {
        type: String
    }
})
module.exports = mongoose.model('Products', productsSchema)