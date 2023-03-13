const express = require('express');

const router = express.Router();

const adminController = require('../Controllers/admin.controller');
const { auth } = require('../MiddleWare/auth.md');
const adminEndPoint = require("../utils/admin.endPoint");

const productController = require('../Controllers/product.controller');

const productMiddleWare = require('../MiddleWare/product.md');
const { HMR, myMulter , multerPath ,multerValidators} = require('../services/multer');


const validateDto = require('../MiddleWare/validate-dto');
const ajvInstance = require('../schema/ajv-instance');
const productSchema = require('../schema/product.schema');

const categoryMiddleWare = require('../MiddleWare/category.md'); 
const { route } = require('./product.router');


// Product Aprove for Admin  
router.patch('/approval/:id', auth(adminEndPoint.admin),adminController.updateApproveProduct);

// get all not approval product for Admin only  
router.get('/notApproval', auth(adminEndPoint.admin),adminController.getAllProductNotApproval);

//get not approved product by id
router.get('/notApproval/:id', auth(adminEndPoint.admin),adminController.getnotapprovedProductByID);

// Get All Users
router.get('/allUsers', auth(adminEndPoint.admin), adminController.getAllUsers);
// Get Specific User By Id
router.get('/user/:id', auth(adminEndPoint.admin), adminController.getUserByID);

// Block Specific User By ID
router.patch('/user/block/:Block/:id', auth(adminEndPoint.admin), adminController.blockUser);

// Get All Balance
router.get('/balance', auth(adminEndPoint.admin), adminController.allBalance);

// Create Category
router.post('/createCategory', auth(adminEndPoint.admin), categoryMiddleWare.checkCategoryExist, adminController.createCategory)

// Update Category
router.patch('/category/:id', auth(adminEndPoint.admin), categoryMiddleWare.checkCategoryExist, adminController.UpdateCategory)
// delete product
router.delete('/delete/:productId',auth(adminEndPoint.admin),productController.deleteProduct);

module.exports = router;