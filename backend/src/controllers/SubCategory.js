const SubCategory = require('../services/SubCategory');

module.exports = class SubCategoryController {
    static async getSubCategories(req, res) {
        try {
            const response = await SubCategory.getSubCategories(req, res);
            res.status(200).send({data: response});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }

    static async addSubCategory(req, res) {
        try {
            const response = await SubCategory.addSubCategory(req, res);
            res.status(200).send({message: "Added"});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }

    static async getAll(req, res) {
        try {
            const response = await SubCategory.getAll(req, res);
            res.status(200).send({data: response});;
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }
}