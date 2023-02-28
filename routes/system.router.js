const express = require('express');
const router = express.Router();


const systemMiddleWare = require('../MiddleWare/system.md');

const systemController = require('../Controllers/system.controller');


router.post('/', systemMiddleWare.checkPresentageIsCreated ,systemController.createPrecentage);
router.patch('/:id', systemController.updatePrecentage);


module.exports = router;