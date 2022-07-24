const SubCategorySchema = require('../models/SubCategory');

module.exports = class SubCategory {
    static async getSubCategories(req, res) {
        try {
            const response = await SubCategorySchema.find({categoryId: req.body.categoryId});
            return response;
        }
        catch(err) {
            throw err;
        }
    }

    static async getAll(req, res) {
        try {
            const response = await SubCategorySchema.find();
            return response;
        }
        catch(err) {
            throw err;
        }
    }

    static async addSubCategory(req, res) {
        try {
            const newBody = {
                name: req.body.subCategoryName,
                categoryId: req.body.categoryId
            }
            const response = await new SubCategorySchema(newBody).save();
            return response;
        }
        catch(err) {
            throw err;
        }
    }
}