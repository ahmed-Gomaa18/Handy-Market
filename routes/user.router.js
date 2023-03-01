const router = require('express').Router();
const userController =require("../Controllers/user.controller");
const { auth } = require('../MiddleWare/auth.md');
const userEndPoint= require("../utils/user.endPoints");
const validateDto = require('../MiddleWare/validate-dto');
const userSchema = require('../schema/user.schema');
const ajvInstance = require('../schema/ajv-instance');
//get user profile
router.get("/getUserProfile",auth(userEndPoint.user),userController.getUserProfile);
//updateUser
router.patch("/updateUser",auth(userEndPoint.user),validateDto(ajvInstance.compile(userSchema.updateUserSchema)) ,userController.updateUser);

//updateUser
router.post("/UpdatePassword",auth(userEndPoint.user),validateDto(ajvInstance.compile(userSchema.updatePasswordUserSchema)),userController.UpdatePassword);

//updateImg
router.post("/updateImag",auth(userEndPoint.user),userController.updateImage);


//delete acc
router.delete("/deleteUser",auth(userEndPoint.user),userController.deleteUser)
module.exports = router;