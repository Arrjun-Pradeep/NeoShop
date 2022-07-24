const express = require('express');
const router = express.Router();

const SubCategoryController = require('../controllers/SubCategory');

router.post('/sub', SubCategoryController.getSubCategories);
router.post('/', SubCategoryController.addSubCategory);
router.get('/', SubCategoryController.getAll);

module.exports = router;