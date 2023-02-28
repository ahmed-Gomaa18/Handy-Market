const Category = require('../Models/Category.model')


let checkCategoryExist = async(req, res, next)=>{
    req.body.name = req.body.name.toLowerCase();
    let category = await Category.findOne({name: req.body.name});
    if(category){
        res.status(400).json({message: 'This Category name is Already exist'})
    }
    else{
        next()
    }
}


module.exports = {
    checkCategoryExist
}