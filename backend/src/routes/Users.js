const express = require('express');
const router = express.Router();
const UserController = require('../controllers/Users');

router.post('/', UserController.addUserIfNotAdded);

module.exports = router;