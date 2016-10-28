var express = require('express');
var router = express.Router();

var auth = require('../config/jwt');

var ctrlVinyls = require('../controllers/vinyls');

// vinyls
router.get('/', ctrlVinyls.getAllVinyls);
router.get('/:id', ctrlVinyls.getVinyl);

router.post('/', auth, ctrlVinyls.createVinyl);

router.put('/files/:id', auth, ctrlVinyls.processFiles, ctrlVinyls.updateVinylFile);
router.put('/reviews/:id', auth, ctrlVinyls.updateVinyl);
router.put('/:id', ctrlVinyls.checkOwnership, ctrlVinyls.updateVinylFilter,  auth, ctrlVinyls.updateVinyl);

router.delete('/:id', auth, ctrlVinyls.deleteVinyl);

module.exports = router;


