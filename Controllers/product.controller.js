const Product = require('../Models/Product.model');
const filter = require('../services/filter')


// Test
let addProduct = (req, res)=>{

    const created_by = req.user._id;
    const {product_name, description, number_of_items ,price, discount, categories_id} = req.body;
    const imagesUrl = [];
    req.files.forEach(file => {
        imagesUrl.push(`${req.finalDestination}/${file.filename}`);
    });

    const newProduct= new Product({
        product_name,description, number_of_items ,price, created_by, categories_id, discount, photos: imagesUrl
    })
    newProduct.save()
    .then((data)=>{
        res.status(201).json({message: 'Add Product Success', data})
    })
    .catch((err)=>{
        res.status(400).json({message: 'Catch Erro : ' + err.message})
    })

};


// get All Products [approve: true and softDelete: false]
let getAllProduct = async (req, res)=>{
    try{
        // Check if send query to filter or not
        let productFilter = req.query == {} ? {} : filter(req.query)

        let allProduct = await Product.find({soft_delete: false, product_approval: true}).find(productFilter)
        .populate({ path: 'ratings_id', select: "-_id rating" }).populate({path: "created_by",select: "user_name shop_name"})
        .populate({path:'categories_id', select: 'name'});
        
        if(allProduct.length == 0){
            res.status(200).json(allProduct)
        }
        else{
            res.status(200).json(allProduct)
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.mesage})
    }

    

}

// get All Products Approval Or Not That Created By Seller {approval}
let getProductsApprovalOrNotCreatedby = async (req, res)=>{
    try{
        // Check approval
        let approval = req.params['approval'] == 'true'? true:false;

        let products = await Product.find({created_by: req.user._id, product_approval: approval , soft_delete: false});

        res.status(200).json({products});
     

    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err})
    }
}

//multer
const addProductImage = async(req,res)=>{
    try {

        const created_by = req.user._id;
        const {id} = req.params ;
        const imagesUrl = [];
        req.files.forEach(file => {
            imagesUrl.push(`${req.finalDestination}/${file.filename}`);
        });

        const product = await Product.findOneAndUpdate({_id:id,created_by}, {photos:imagesUrl}, {new:true});

        if(product){
            res.status(200).json({message: 'Done Update Product image' , product})
        }else{
            res.status(400).json({message: 'May be Wrong Happen While Update Product'})
        }
        

    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Catch Erro : ' + error})

    }
}

// Get Product By ID With Some Related Category
let getProductByID = async(req, res)=>{
    try{
        let product = await Product.findOne({_id: req.params['id'], soft_delete: false, product_approval: true}).populate({ path: 'ratings_id', select: "-_id rating" }).populate({path: "created_by",
        select: "user_name shop_name"}).populate({path:'categories_id', select: 'name'});
        if(product){
            let category_id = product.categories_id[0]
            let relatedProduct = await Product.find({categories_id: {$in: category_id}}).populate({ path: 'ratings_id', select: "-_id rating" }).populate({path: "created_by",select: "user_name"}).populate({path:'categories_id', select: 'name'}).limit(5);
            let nRelatedProduct = relatedProduct.filter((pro)=>{
                return pro._id.toString() != product._id.toString();
            })
            res.status(200).json({product, nRelatedProduct})
        }
        else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist Or Prudct Not Approval'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
    
}

// Update Product By Seller Send Created_by id With body object.
let updateProduct = async(req, res)=>{
    try{

        if(req.body.product_name){
            let product = await Product.findById(req.params['productId']);
            
            if (product.product_name == req.body.product_name){
                let product = await Product.findOneAndUpdate({_id: req.params['productId']}, {...req.body}, {new:true});
                if(product){
                    res.status(200).json({product})
                }
                else{
                    res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
                }
            }
            // Logic
            else{
                let allProducts = await Product.find({created_by: req.params['sellerId']});
                
                let flag = allProducts.find((product)=>{
                    return product.product_name == req.body.product_name;
                })

                if (flag){
                    res.status(400).json({message: 'This Product name is Already exist'})
                }
                else{

                    let product = await Product.findOneAndUpdate({_id: req.params['productId']}, {...req.body}, {new:true});
                    if(product){
                        res.status(200).json({product})
                    }
                    else{
                        res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
                    }

                }

            }
        }
        else{
            let product = await Product.findOneAndUpdate({_id: req.params['productId']}, {...req.body}, {new:true});
            if(product){
                res.status(200).json({product})
            }
            else{
                res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
            }
        }

    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}

// For Admin to approval product
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

//delete Product By Seller Handel By Middleware
let deleteProduct = async(req, res)=>{
    try{
        let productDeleted = await Product.findByIdAndUpdate(req.params['productId'], {soft_delete: true}, {new: true});
        if(productDeleted){
            res.status(200).json({message: 'This Product Is Deleted Successfuly.'});
        }else{
            res.status(400).json({message: 'May Wrong in Product ID or This Product Not Exist'})
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

// For Admin To get All Products That not Approval
let getAllProductNotApproval = async(req, res)=>{
    try{
        let products = await Product.find({product_approval: false}).populate({path: "created_by",select: "user_name"});
        res.status(200).json({products});
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err})
    }
}

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




module.exports = {
    getAllProduct,
    addProduct,
    getProductsApprovalOrNotCreatedby,
    updateProduct,
    getProductByID,
    updateApproveProduct,
    deleteProduct,
    getAllProductNotApproval,
    addProductImage,
    getnotapprovedProductByID

}


