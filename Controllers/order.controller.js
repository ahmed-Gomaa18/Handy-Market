const moment = require("moment/moment");
const Order = require("../Models/Order.model");
const Product = require("../Models/Product.model");




const createOrder = async(req,res)=>{
    try {
      const {products , phone , order_address , payment_method } = req.body ;
      const {_id} = req.user;
        
      let totalPrice = 0 ;
      let sumTotal = 0;
      const finalList = []

      for (let i = 0; i < products.length; i++) {
        sumTotal= products[i].unitPrice * products[i].quantity ;
        totalPrice += sumTotal ;
        finalList.push(products[i]);
      }
      const newOrder = new Order({products:finalList , phone , order_address , payment_method ,user_id:_id  , totalPrice , date:moment().format()});
      const savedOrder = await newOrder.save();
      if (!savedOrder) {
        res.status(503).json({message:"Sorry , Please try to re-order agian"});
      }else{
        res.status(201).json({message:"Done" , savedOrder });
      }
    
    } catch (error) {
        res.status(500).json({message:"Catch Error : " + error.message})
    }
};


const cancelOrder = async(req,res)=>{
  try {
    const userID = req.user._id;
    const {id} = req.params
      
   const orderFound = await Order.findOneAndDelete({_id:id ,user_id:userID},{new:true});
   if (!orderFound) {
    res.status(404).json({ message: "in-valid Order id" })
   }else{
    res.status(200).json({ message: "Delete Done"})
   }
  } catch (error) {
    res.status(500).json({message:"Catch Error : " + error.message})
  }
};


module.exports = {
    createOrder ,
    cancelOrder
}