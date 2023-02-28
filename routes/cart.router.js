const router = require('express').Router();
const cartController = require('../Controllers/cart.controller');

// /cart ==> Get
router.get('/:user_Id', cartController.getCart);

// /addToCart ==> Post
router.post('/addToCart/:userId/product/:productId', cartController.addToCart);

// /deleteFromCart ==> Post
router.post('/deleteFromCart/:userId/product/:productId', cartController.deleteFromCart);

// /saveCart ==> PUT
router.put('/saveCart/:userId/cart/:cartId', cartController.saveCart);

module.exports = router;