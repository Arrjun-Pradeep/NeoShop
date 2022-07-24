const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

const ProductsController = require('../controllers/Products');

router.post('/get', ProductsController.getProducts);
router.post('/', ProductsController.addProduct);
router.post('/update', ProductsController.updateQuantity);
router.post('/search', ProductsController.getProductsFromSearch);

module.exports = router;