const Balance = require('../Models/Balance.model');

let allBalance = async (req, res)=>{
    try{
        let allBalance = await Balance.find({}).populate('order_id');
        if(!allBalance){
            res.status(400).json({message: 'May Error Happen When Get All Balance'})
        }else{
            res.status(200).json({message: allBalance})
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

let getBalanceByID = async (req, res)=>{
    try{
        let balance = await Balance.findById(req.params['id']).populate('order_id');
        if(!balance){
            res.status(400).json({message: 'May Error Happen When Get Balance'})
        }else{
            res.status(200).json({message: balance})
        }
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

module.exports = {
    allBalance,
    getBalanceByID
}