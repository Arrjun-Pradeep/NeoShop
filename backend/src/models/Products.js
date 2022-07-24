const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageAddress: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    sellerWalletAddress: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellerName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Products", ProductsSchema);