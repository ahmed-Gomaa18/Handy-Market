const Review = require('../Models/Review.model');

const Product = require('../Models/Product.model');


// push rating id to product
let pushRatingIdToProduct = async(product_id ,rate_id)=>{
    let newProduct = await Product.findOneAndUpdate({_id: product_id}, {$push: {ratings_id: rate_id}});
    if(!newProduct){
        throw Error('Can not Push Rate to product')
    }
}


let updateReview = async(req, res)=>{
    try{
        const {product_id, message} = req.body;

        //get Review By Id
        let review = await Review.findOneAndUpdate({_id: req.params['id'], user_id: req.user._id, product_id: product_id}, {message}, {new:true});
        if(review){
            res.status(200).json({message: 'Updated Review Successfully', review});
        }else{
            res.status(400).json({message: 'Maybe This review not belong to right customer'})
        }

    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}

let createOrUpdatReview = async(req, res)=>{
    try{
        const {product_id, message} = req.body;
        let review = await Review.findOneAndUpdate({user_id: req.user._id, product_id: req.body.product_id}, {message}, {new: true});
        if(review){
            res.status(200).json({message: 'Customer review Successfully', review});
        }else{
            let newReview = new Review({user_id: req.user._id, product_id, message});
            newReview.save()
            .then(async ()=>{
                // push rate to product array
                await pushRatingIdToProduct(product_id, newReview._id)

                res.status(200).json({message: 'Customer review Successfully', newReview})
            })
            .catch((err)=>{
                res.status(400).json({message: 'Maybe You have Error : ' + err.message})
            })
        }

    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }  
}


let createOrUpdateRating = async(req, res)=>{
    try{

        const {product_id, rating} = req.body;

        let rate = await Review.findOneAndUpdate({user_id: req.user._id, product_id: req.body.product_id}, {rating}, {new: true});
        if(rate){
            res.status(200).json({message: 'Customer rate Successfully', rate});
        }else{
            let newRate = new Review({user_id: req.user._id, product_id, rating});
            newRate.save()
            .then( async ()=>{
                // push rate to product array
                await pushRatingIdToProduct(product_id, newRate._id)
                res.status(200).json({message: 'Customer rate Successfully', newRate})
            })
            .catch((err)=>{
                res.status(400).json({message: 'Maybe You have Error : ' + err.message})
            })
        }

    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }   
}


module.exports = {
    updateReview,
    createOrUpdatReview,
    createOrUpdateRating
}