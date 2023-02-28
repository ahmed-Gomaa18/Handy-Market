const Review = require('../Models/Review.model');


let checkReviewOnTheSamePro = async(req, res, next)=>{
    // Search
    let check = await Review.findOne({user_id: req.body.user_id, product_id: req.body.product_id});
    
    if(check){
        res.status(400).json({message: 'Cant Append Review Twice on the Same Product'})
    }else{
        next()
    }
}


module.exports = {
    checkReviewOnTheSamePro
}