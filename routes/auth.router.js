const router = require('express').Router();
const { auth } = require('../MiddleWare/auth.md');
const authController = require('../controllers/auth.controller');
const endPointAuth = require('../utils/auth.endPoint');

//signUp 
router.post('/singUp' , authController.signup);

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