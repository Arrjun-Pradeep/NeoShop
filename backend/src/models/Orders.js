const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = Schema({
    totalAmount: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Orders", OrdersSchema);