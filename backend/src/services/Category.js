const CategorySchema = require('../models/Category');

module.exports = class Category {
    static async getCategories(req, res) {
        try {
            const response = await CategorySchema.find();
            return response;
        }
        catch(err) {
            throw err;
        }
    }

    static async addCategory(req, res) {
        try {
            const newBody = {
                name: req.body.categoryName
            }
            const response = await new CategorySchema(newBody).save();
            return response;
        }
        catch(err) {
            throw err;
        }
    }
}