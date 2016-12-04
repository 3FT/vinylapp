var express = require('express');
var router = express.Router();
var auth = require('../config/jwt');

var ctrlUsers = require('../controllers/users');

// users
router.get('/', ctrlUsers.getAllUsers);
router.get('/:id', ctrlUsers.getUser);
router.put('/:id', auth, ctrlUsers.updateUser);
router.post('/', ctrlUsers.createUser);

module.exports = router;
