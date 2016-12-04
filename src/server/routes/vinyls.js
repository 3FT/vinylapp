var express = require('express');
var router = express.Router();
var auth = require('../config/jwt');

var ctrlVinyls = require('../controllers/vinyls');

// vinyls
router.get('/', ctrlVinyls.getAllVinyls);
router.get('/:id', ctrlVinyls.getVinyl);

router.post('/', auth, ctrlVinyls.vinylJsonFilter, ctrlVinyls.createVinyl);

router.put('/files/:id', auth, ctrlVinyls.processFiles, ctrlVinyls.updateVinylFile);
router.put('/reviews/:id', auth, ctrlVinyls.updateAverageRating, ctrlVinyls.updateVinyl);
router.put('/:id', auth, ctrlVinyls.checkOwnership, ctrlVinyls.vinylJsonFilter, ctrlVinyls.updateVinyl);

router.delete('/:id', auth, ctrlVinyls.deleteVinyl);

module.exports = router;


