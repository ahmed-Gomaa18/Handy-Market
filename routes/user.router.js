const router = require('express').Router();
const userController =require("../Controllers/user.controller");
const { auth } = require('../MiddleWare/auth.md');
const userEndPoint= require("../utils/user.endPoints");
const validateDto = require('../MiddleWare/validate-dto');
const userSchema = require('../schema/user.schema');
const ajvInstance = require('../schema/ajv-instance');
const { HMR, myMulter , multerPath ,multerValidators} = require('../services/multer');


//get user profile
router.get("/getUserProfile",auth(userEndPoint.user),userController.getUserProfile);

// New ---- Update User (profile with all data)
router.patch('/updateUserWithProfile', auth(userEndPoint.user), myMulter( multerPath.profilePic , multerValidators.image).single('profile_image') , HMR, userController.updateUserWithProfile)

//updateUser
router.patch("/updateUser",auth(userEndPoint.user),validateDto(ajvInstance.compile(userSchema.updateUserSchema)) ,userController.updateUser);

//updateUser
router.patch("/updatePassword",auth(userEndPoint.user),validateDto(ajvInstance.compile(userSchema.updatePasswordUserSchema)),userController.updatePassword);

//update Img With multer
router.patch("/updateImag",auth(userEndPoint.user), myMulter( multerPath.profilePic , multerValidators.image).single('image') , HMR, userController.updateImage);


//deActivatedUser 
router.patch("/deActivated",auth(userEndPoint.user),userController.deActivatedUser);

//reActive user
router.patch("/reActivated",userController.reActivatedUser);

//whishlist User
router.patch("/whishlist/:id",auth(userEndPoint.customer),userController.whishlistUser);

//unwhishlist User
router.patch("/unWhishlist/:id",auth(userEndPoint.customer),userController.unWhishlistUser);

//favoriteUser
router.patch("/favorit/:id",auth(userEndPoint.customer),userController.favoriteUser);

//unfavorite User
router.patch("/unfavorit/:id",auth(userEndPoint.customer),userController.unFavoriteUser);

//subscription User
router.patch("/subscription/:id",auth(userEndPoint.customer),userController.subscriptionUser);

//unSubscription User
router.patch("/unSubscription/:id",auth(userEndPoint.customer),userController.unSubscriptionUser);


module.exports = router;