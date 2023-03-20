const Category = require('../Models/Category.model');


let createCategory = (req, res)=>{
  try {
        let user_id = req.user._id;

        let newCategory = new Category({user_id, name_en:req.body.name_en, name_ar:req.body.name_ar});
        newCategory.save()
        .then(()=>{
            res.status(200).json({message: 'created Category SuccessFully', newCategory})
        })
        .catch((err)=>{
            res.status(400).json({message: 'Catch Error : ' + err.message})
        })
   } catch (error) {

    res.status(400).json({message: 'Catch Error : ' + err.message})
   } 
    
}

let UpdateCategory = async(req, res)=>{
    try{

        let category = await Category.findByIdAndUpdate(req.params['id'], {name_en: req.body.name_en, name_ar: req.body.name_ar}, {new: true});
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

let getAllCategories = async(req, res)=>{
    try{
        let allCategories = await Category.find({});
        if(allCategories){
            res.status(200).json({allCategories})
        }else{
            res.status(400).json({message: 'May Error When Get All Product'})
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

module.exports = {
    createCategory,
    UpdateCategory,
    getAllCategories
}