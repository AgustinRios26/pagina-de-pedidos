const mongoose = require('mongoose');
const Schema = mongoose.Schema


const ordersSchema = new Schema({
    customer: {
        type: Schema.ObjectId,
        ref: 'customers'
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'products'
        },
        amount: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Orders', ordersSchema);