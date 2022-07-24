const ProductsSchema = require('../models/Products');
const { create } = require("ipfs-http-client");
const SubCategorySchema = require('../models/SubCategory');
const uriFile = require('../utils/web3');

module.exports = class Products {

    static client;

    static async initializeIPFS() {
        try {
            const projectId = "1yAQKsMawsft8Fw9FtNX1ZOgPz8";
            const projectSecret = "5e1658b5a43a08c7257712e407b99e4d";
            const auth =
              "Basic " +
              Buffer.from(projectId + ":" + projectSecret).toString("base64");
            this.client = create({
              host: "ipfs.infura.io",
              port: 5001,
              protocol: "https",
              headers: {
                authorization: auth,
              },
            });
          } catch (error) {
            console.log(":: INITIALIZE_IPFS :: ERROR :: \n", error);
            return;
          }
    }

    static async addProduct(req, res) {
        try {

            await this.initializeIPFS();
            console.log(req.body);
            console.log(req.files);
            const url = await this.client.add(req.files.file.data, {
                cidVersion: 1,
                hashAlg: "sha2-256",
            });

            const imageUrl = `https://ipfs.infura.io/ipfs/${url?.path}`;
            
            const newBody = {
                name: req.body.productName,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                description: req.body.description,
                imageAddress: imageUrl,
                price: req.body.price,
                sellerWalletAddress: req.body.sellerWalletAddress,
                brandName: req.body.brandName,
                quantity: req.body.quantity,
                sellerName: req.body.sellerName
            };

            const response = await new ProductsSchema(newBody).save();
            await uriFile.uploadURI(imageUrl, response._id);
            return response;
        }
        catch(err) {
            throw err;
        }
    }

    static async getProducts(req, res) {
        try {
            const response = await ProductsSchema.find({subCategoryId: req.body.subCategoryId});
            return response;
        }
        catch(err) {
            throw err;
        }
    }

    static async updateQuantity(req, res) {
        try {
            const response = await ProductsSchema.find({_id: req.body.id});
            const quantity = parseInt(response.quantity);
            const newQuantity = quantity - req.body.quantity;
            await ProductsSchema.findOneAndUpdate({_id: req.body.id}, {quantity: newQuantity});
            return true;
        }
        catch(err) {
            throw err;
        }
    }

    static async getProductsFromSearch(req, res) {
        try {
            console.log(req.body.search);
            const productsData = await ProductsSchema.find({name:{$regex: new RegExp(req.body.search)}},{__v:0})
            const subCategory = await SubCategorySchema.find({name:{$regex: new RegExp(req.body.search)}},{_id:1});
            console.log(subCategory);
            let subCategoryIDS = [];
            const getIDS = (value, index, array) => {
                subCategoryIDS.push(value._id);
            }
            subCategory.forEach(getIDS);
            console.log(subCategoryIDS);
            const productsWithSubCategory = await ProductsSchema.find({subCategoryId: {$in: subCategoryIDS}});
            let finalData = productsData.concat(productsWithSubCategory);
            console.log(finalData);
            // finalData = finalData.filter((value, index, self) => {
            //     index === self.findIndex((t) => (
            //         t._id === value._id
            //     ))
            // });
            return finalData;
        }
        catch(err) {
            throw err;
        }
    }
}