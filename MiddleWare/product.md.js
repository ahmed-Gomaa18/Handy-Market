const Product = require('../Models/Product.model');


let checkProductOwner = async(req, res, next)=>{
    let product = await Product.findById(req.params['productId']);

    if (product.created_by == req.params['sellerId']){
        next();
    }else{
        res.status(400).json({message: 'Catch Error: This Seller Is Not Owner'})
    }
}



module.exports = {
    checkProductOwner,

}