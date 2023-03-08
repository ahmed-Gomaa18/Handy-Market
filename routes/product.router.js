const express = require('express');

const router = express.Router();

const productController = require('../Controllers/product.controller');
const { auth } = require('../MiddleWare/auth.md');
const productEndPoint = require("../utils/product.endPoint");
const productMiddleWare = require('../MiddleWare/product.md');
const { HMR, myMulter , multerPath ,multerValidators} = require('../services/multer');


const validateDto = require('../MiddleWare/validate-dto');
const ajvInstance = require('../schema/ajv-instance');
const productSchema = require('../schema/product.schema');


// Add New Product With Image
router.post('/', auth(productEndPoint.product), myMulter( multerPath.product , multerValidators.image).array('photos' , 4) , HMR  ,productController.addProduct); // Not we Send Form Data To send whole product at one time  //validateDto(ajvInstance.compile(productSchema.createProduct)), 

// get All Product
router.get('/', productController.getAllProduct);

//multer
router.patch('/image/:id',auth(productEndPoint.product) ,myMulter( multerPath.product , multerValidators.image).array('image' , 4) , HMR  ,productController.addProductImage);



// get all Products Approval Or Not Approval that created By Seller detected by {approval}  TODO => [MiddleWare]
router.get('/seller/:approval', productController.getProductsApprovalOrNotCreatedby);

// Update Product By Owner Seller 
router.patch('/seller/:sellerId/update/:productId', auth(productEndPoint.product) , validateDto(ajvInstance.compile(productSchema.createProduct)), productMiddleWare.checkProductOwner, validateDto(ajvInstance.compile(productSchema.createProduct)), productController.updateProduct);


// get Product By Id
router.get('/:id', productController.getProductByID);

// delete Product by ID From Seller
router.delete('/seller/:sellerId/delete/:productId', productMiddleWare.checkProductOwner, productController.deleteProduct);

// delete Product By seller TODO => [MiddleWare]
router.delete('/delete/:productId', productController.deleteProduct);


module.exports = router;
