var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');


// authentication
router.post('/login', ctrlAuth.login);



module.exports = router;
