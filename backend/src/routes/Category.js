const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category');

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.addCategory);

module.exports = router;