const express = require('express');
const router = express.Router();

const reviewController = require('../Controllers/review.controller');

const reviewEndPoint = require('../utils/review.endPoint');
const { auth } = require('../MiddleWare/auth.md');
const validateDto = require('../MiddleWare/validate-dto');
const ajvInstance = require('../schema/ajv-instance');
const reviewSchema = require('../schema/review.schema');


//router.post('/', reviewMiddleWare.checkReviewOnTheSamePro, reviewController.createReview);
router.patch('/editReview/:id', auth(reviewEndPoint.review), validateDto(ajvInstance.compile(reviewSchema.reviewSchema)), reviewController.updateReview);

// For Review
router.post('/', auth(reviewEndPoint.review), validateDto(ajvInstance.compile(reviewSchema.reviewSchema)), reviewController.createOrUpdatReview )

// For Rating
router.post('/rating', auth(reviewEndPoint.review), validateDto(ajvInstance.compile(reviewSchema.ratingSchema)), reviewController.createOrUpdateRating )



module.exports = router