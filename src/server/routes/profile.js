var express = require('express');
var router = express.Router();

var auth = require('../config/jwt');

var ctrlProfile = require('../controllers/profile');

// profile
router.get('/', auth, ctrlProfile.profileRead);

module.exports = router;
