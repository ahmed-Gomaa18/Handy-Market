const System = require('../Models/System.model');


let checkPresentageIsCreated = async (req, res, next)=>{
    try{
        let precentages = await System.find({});
        if(precentages.length > 0){
            res.status(400).json({message: 'Cant not Create Another Precentage'})
        }
        else{
            next();
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

module.exports = {
checkPresentageIsCreated
}