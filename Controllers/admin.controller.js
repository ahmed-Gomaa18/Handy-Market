const Product = require('../Models/Product.model');


let getnotapprovedProductByID = async(req, res)=>{
    try{
        let product = await Product.findOne({_id: req.params['id'], soft_delete: false, product_approval: false}).populate('ratings_id');
        if(product){
            res.status(200).json({product})
        }
        else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist Or Prudct Not Approval'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
    
}

let getAllProductNotApproval = async(req, res)=>{
    try{
        let products = await Product.find({product_approval: false}).populate({path: "created_by",select: "user_name"});
        res.status(200).json({products});
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err})
    }
}

let updateApproveProduct = async(req, res)=>{
    try{
        // Check First if Product Is Not Deleted
        let product = await Product.findById(req.params['id'])
        if(product.soft_delete == true){
            res.status(400).json({message: 'can not Approve Deleted Product..'})
        }else{
        
            let productApproval = await Product.findByIdAndUpdate(req.params['id'], {product_approval: true}, {new: true});
            
            if(productApproval){
                res.status(200).json({message: 'This Product Is Approval.', productApproval});
            }else{
                res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
            }
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}

module.exports = {
    getnotapprovedProductByID,
    getAllProductNotApproval,
    updateApproveProduct

}