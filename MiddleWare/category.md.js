const Category = require('../Models/Category.model')


let checkCategoryExist = async(req, res, next)=>{
    req.body.name_en = req.body.name_en.toLowerCase();
    let category_en = await Category.findOne({name_en: req.body.name_en});
    let category_ar = await Category.findOne({name_ar: req.body.name_ar});
    if(category_ar){
        res.status(400).json({message: 'This Category name is Already exist'})
    }
    else if(category_en){
        res.status(400).json({message: 'This Category name is Already exist'})
    }
    else{
        next()
    }
}


module.exports = {
    checkCategoryExist
}