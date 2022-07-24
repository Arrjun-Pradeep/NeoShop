const Products = require('../services/Products');

module.exports = class ProductsController {
    static async getProducts(req, res) {
        try {
            const response = await Products.getProducts(req, res);
            res.status(200).send({data: response});
        }
        catch(err) {
            res.status(500).send({message: 'Failed'});
        }
    }

    static async addProduct(req, res) {
        try {
            const response = await Products.addProduct(req, res);
            res.status(200).send({message: "Added"});
        }
        catch(err) {
            console.log(err);
            res.status(500).send({message: 'Failed', error: err});
        }
    }

    static async updateQuantity(req, res) {
        try {
            const response = await Products.updateQuantity(req, res);
            res.status(200).send({message: "Updated"});
        }
        catch(err) {
            res.status(500).send({message: 'Failed', error: err});
        }
    }

    static async getProductsFromSearch(req, res) {
        try {
            const response = await Products.getProductsFromSearch(req, res);
            res.status(200).send({data: response});
        }
        catch(err) {
            res.status(500).send({message: 'Failed', error: err});
        }
    }
}