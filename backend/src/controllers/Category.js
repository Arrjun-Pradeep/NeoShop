const Category = require('../services/Category');

module.exports = class CategoryController {
    static async getCategories(req, res) {
        try {
            const response = await Category.getCategories(req, res);
            res.status(200).send({data: response});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }

    static async addCategory(req, res) {
        try {
            const response = await Category.addCategory(req, res);
            res.status(200).send({message: "Added"});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }
}