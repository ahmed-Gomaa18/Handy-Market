const router = require('express').Router();
const { auth } = require('../MiddleWare/auth.md');
const authController = require('../controllers/auth.controller');
const endPointAuth = require('../utils/auth.endPoint');
const validateDto = require('../MiddleWare/validate-dto');
const authSchema = require('../schema/auth.schema');
const ajvInstance = require('../schema/ajv-instance');

//signUp 
router.post('/singUp' ,validateDto(ajvInstance.compile(authSchema.singUpSchema)) ,authController.signup);

// SellersignUp 
router.post('/seller/singUp' ,validateDto(ajvInstance.compile(authSchema.sellerSignUpSchema)) ,authController.sellerSignup);

//confrimEmail
router.get('/confrimEmail/:token' , authController.cofrimEmail);

//resendToken
router.get('/resendToken/:id', authController.resendToken);

//login
router.post('/login' ,authController.login);

//request forget password ..>code
router.post('/sendCode' ,  authController.sendCode );

//check Code
router.post('/checkCode' , authController.checkCode);


//forget Password ..>code ..>changePassword
router.post('/forgetPassword' , authController.forgetPassword);


//logOut
router.patch('/logOut',auth(endPointAuth.signOut),authController.signOut);









module.exports = router;