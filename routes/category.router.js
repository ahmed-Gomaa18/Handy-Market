const express = require('express');
const router = express.Router();


const categoryMiddleWare = require('../MiddleWare/category.md');

const categoryController = require('../Controllers/category.controller');


router.post('/', categoryMiddleWare.checkCategoryExist, categoryController.createCategory);
router.patch('/:id', categoryMiddleWare.checkCategoryExist, categoryController.UpdateCategory);


module.exports = router;