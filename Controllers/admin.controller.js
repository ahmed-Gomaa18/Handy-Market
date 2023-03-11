const Product = require('../Models/Product.model');
const User = require('../Models/User.model');
const Balance = require('../Models/Balance.model');
const Category = require('../Models/Category.model');


let getnotapprovedProductByID = async(req, res)=>{
    try{
        let product = await Product.findById({_id: req.params['id'], soft_delete: false, product_approval: false}).populate('ratings_id');
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

let getAllUsers = async (req, res)=>{
    try{
        let allUser = await User.find({_id:{$ne:req.user._id}});
        if(allUser.length){
            res.status(200).json(allUser)
        }else{
            res.status(200).json(allUser)
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

let getUserByID = async (req, res)=>{
    try{
        let user = await User.findById(req.params['id']);
        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json({message: 'May This User Is not Exist'})
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

let blockUser = async(req, res)=>{
    try{
        console.log(req.params['Block'] )
        let block = req.params['Block'] == 'true'? true:false;

        let blockUser = await User.findByIdAndUpdate(req.params['id'], {isBlocked: block}, {new: true})

        if(blockUser){
            res.status(200).json({message: 'This User Was Blocked Successfully', blockUser})
        }else{
            res.status(400).json({message: 'May This Blocked User Is not Exist'})
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

let allBalance = async(req, res)=>{
    try{
        let allBalance = await Balance.find({}).populate('order_id');
        if(!allBalance){
            res.status(400).json({message: 'May Error Happen When Get All Balance'})
        }else{
            res.status(200).json(allBalance)
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

let createCategory = (req, res)=>{
    let user_id = req.user._id;
    let newCategory = new Category({user_id, name:req.body.name});
    newCategory.save()
    .then(()=>{
        res.status(200).json({message: 'created Category SuccessFully', newCategory})
    })
    .catch((err)=>{
        res.status(400).json({message: 'Catch Error : ' + err.message})
    })
}

let UpdateCategory = async(req, res)=>{
    try{

        let category = await Category.findByIdAndUpdate(req.params['id'], {name: req.body.name}, {new: true});
        if(category){
            res.status(200).json({message: 'Updated Category SuccessFully', category})
        }
        else{
            res.status(400).json({message: 'May Be Wrong happen While Update'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }   


}


module.exports = {
    getnotapprovedProductByID,
    getAllProductNotApproval,
    updateApproveProduct,
    getAllUsers,
    getUserByID,
    blockUser,
    allBalance,
    createCategory,
    UpdateCategory

}