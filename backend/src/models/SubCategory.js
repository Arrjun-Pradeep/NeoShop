const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);