const router = require('express').Router();
const orderController = require('../Controllers/order.controller');
const { auth } = require('../MiddleWare/auth.md');
const validateDto = require('../MiddleWare/validate-dto');
const orderEndPoint = require("../utils/order.endPoint");
const ajvInstance = require('../schema/ajv-instance');
const  createOrderSchema  = require('../schema/order.schema');

//create order
router.post('/create',auth(orderEndPoint.order), validateDto(ajvInstance.compile(createOrderSchema.createOrderSchema)), orderController.createOrder);


//cancel order
router.delete('/cancel/:id',auth(orderEndPoint.order),orderController.cancelOrder)










module.exports = router ;