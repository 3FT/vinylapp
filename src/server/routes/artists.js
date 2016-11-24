var express = require('express');
var router = express.Router();

var auth = require('../config/jwt');

var ctrlArtists = require('../controllers/artists');

// artists
router.get('/', ctrlArtists.getAllArtists);
router.get('/:id', ctrlArtists.getArtist);

router.post('/', auth, ctrlArtists.createArtist);

router.put('/:id', auth, ctrlArtists.updateArtist);

router.delete('/:id', ctrlArtists.deleteArtist);


module.exports = router;


