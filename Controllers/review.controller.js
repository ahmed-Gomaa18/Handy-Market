const Review = require('../Models/Review.model');


let createReview = (req, res)=>{
    let newReview = new Review({...req.body});
    newReview.save()
    .then(()=>{
        res.status(200).json({message: 'created Review SuccessFully', newReview})
    })
    .catch((err)=>{
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }) 
}


let updateReview = async(req, res)=>{
    try{
        //get Review By Id
        let review = await Review.findOneAndUpdate({_id: req.params['id']}, {...req.body}, {new:true});
        if(review){
            res.status(200).json({message: 'Updated Review Successfully', review});
        }else{
            res.status(400).json({message: 'May Wrong happen While Update'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}





module.exports = {
    createReview,
    updateReview
}