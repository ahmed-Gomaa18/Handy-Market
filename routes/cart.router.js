const router = require('express').Router();
const cartController = require('../Controllers/cart.controller');
const validateDto = require('../MiddleWare/validate-dto');
const ajvInstance = require('../schema/ajv-instance');
const { cartSchema } = require('../schema/cart.schema');

// /cart ==> Get
router.get('/:user_Id', validateDto(ajvInstance.compile(cartSchema)), cartController.getCart);

// /addToCart ==> Post
router.post('/addToCart/:userId/product/:productId', validateDto(ajvInstance.compile(cartSchema)), cartController.addToCart);

// /deleteFromCart ==> Post
router.post('/deleteFromCart/:userId/product/:productId', validateDto(ajvInstance.compile(cartSchema)), cartController.deleteFromCart);

// /saveCart ==> PUT
router.put('/saveCart/:userId/cart/:cartId', validateDto(ajvInstance.compile(cartSchema)), cartController.saveCart);

module.exports = router;