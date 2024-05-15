var express = require('express');
var router = express.Router();

const controller = require('../controllers/pasaghyr.controller')
const middleware = require('../middlewares/pasaghyr.middleware')

router.route('/')
    .get(controller.getPasaghyrs)
    .post(controller.createPasaghyr)

router.route('/file')
    .post(middleware.pasaghyrUploadJSON, controller.createPasaghyrFromJSONFile)

router.route('/:id')
    .get(controller.getPasaghyr)
    .put(controller.updatePasaghyr)
    .delete(controller.deletePasaghyr)

module.exports = router;
