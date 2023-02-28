const express = require('express');
const router = express.Router();

const reviewController = require('../Controllers/review.controller');

const reviewMiddleWare = require('../MiddleWare/review.md');


router.post('/', reviewMiddleWare.checkReviewOnTheSamePro, reviewController.createReview);
router.patch('/editReview/:id', reviewController.updateReview);





module.exports = router