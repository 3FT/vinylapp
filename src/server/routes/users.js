var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users');


// users
router.get('/', ctrlUsers.getAllUsers);
router.get('/:id', ctrlUsers.getUser);

module.exports = router;
