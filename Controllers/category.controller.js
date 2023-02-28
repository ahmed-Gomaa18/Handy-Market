const Category = require('../Models/Category.model');


let createCategory = (req, res)=>{
    let newCategory = new Category({...req.body});
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

        let category = await Category.findByIdAndUpdate(req.params['id'], {...req.body}, {new: true});
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
    createCategory,
    UpdateCategory
}