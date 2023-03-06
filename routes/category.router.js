const express = require('express');
const router = express.Router();


const categoryMiddleWare = require('../MiddleWare/category.md');

const categoryController = require('../Controllers/category.controller');
const { auth } = require('../MiddleWare/auth.md');
const CategoryEndPoint = require('../utils/category.endPoint')

// Admin Only Can Create Category
router.post('/', auth(CategoryEndPoint.category), categoryMiddleWare.checkCategoryExist, categoryController.createCategory);
// Admin Only Can Update Category
router.patch('/:id', auth(CategoryEndPoint.category), categoryMiddleWare.checkCategoryExist, categoryController.UpdateCategory);

router.get('/',  categoryController.getAllCategories);

module.exports = router;