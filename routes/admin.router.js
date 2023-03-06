const express = require('express');

const router = express.Router();

const adminController = require('../Controllers/admin.controller');
const { auth } = require('../MiddleWare/auth.md');
const adminEndPoint = require("../utils/admin.endPoint");

const productMiddleWare = require('../MiddleWare/product.md');
const { HMR, myMulter , multerPath ,multerValidators} = require('../services/multer');


const validateDto = require('../MiddleWare/validate-dto');
const ajvInstance = require('../schema/ajv-instance');
const productSchema = require('../schema/product.schema');


// Product Aprove for Admin  
router.patch('/approval/:id', auth(adminEndPoint.admin),adminController.updateApproveProduct);

// get all not approval product for Admin only  
router.get('/notApproval', auth(adminEndPoint.admin),adminController.getAllProductNotApproval)
//get not approved product by id
router.get('/notApproval/:id', auth(adminEndPoint.admin),adminController.getAllProductNotApproval)




module.exports = router;