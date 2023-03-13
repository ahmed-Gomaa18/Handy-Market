const router = require('express').Router();

const paymentController = require('../Controllers/payment.controller');

router.post('/', paymentController.createPayment)


module.exports = router;