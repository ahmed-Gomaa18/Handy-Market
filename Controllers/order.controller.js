const moment = require("moment/moment");
const Order = require("../Models/Order.model");
const Product = require("../Models/Product.model");

const Balance = require('../Models/Balance.model');
const System = require('../Models/System.model');

// Function To Create Balance
const createBalance = async(order)=>{
    // Get Pecentage0
  let precentage = await System.find().limit(1).sort({$natural:-1});
  // Get last record in DB
  let lastBalance = await Balance.find().limit(1).sort({$natural:-1});
  let lastBalanceBella;
   if (lastBalance.length) {
    lastBalanceBella = lastBalance[0].total_profit;
    }else{
    lastBalanceBella = 0
    }
  // new Order Profit
  let new_order_profit = ((order.totalPrice) * (precentage[0].precentage / 100)) ;
  let newBalance = new Balance({
    total_profit:  lastBalanceBella + new_order_profit,
    order_id: order._id,
    order_profit: new_order_profit,
  });

  await newBalance.save();

}

const silodItemProduct = async(products)=>{

  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById({_id:products[i].product_id});
    if(product){
         let productQun = product.number_of_items - products[i].quantity;
         let productSolid = product.sold_items + products[i].quantity;
          await Product.findByIdAndUpdate({_id:product._id},
         {number_of_items: productQun,sold_items:productSolid},{new:true})


    }
  }
    
}

const createOrder = async(req,res)=>{
    try {
      const {products , phone , order_address , payment_method } = req.body ;
      const {_id} = req.user;
        
      let totalPrice = 0 ;
      let sumTotal = 0;
      const finalList = []

      for (let i = 0; i < products.length; i++) {
        // new Update
        let pro = await Product.findById(products[i].product_id).select('-_id price');
        // Updated 
        sumTotal = (products[i].quantity || 1 ) * pro.price;
        totalPrice += sumTotal ;
        finalList.push(products[i]);
      }
      const newOrder = new Order({products:finalList , phone , order_address , payment_method ,user_id:_id  , totalPrice , date:moment().format()});
      const savedOrder = await newOrder.save();
      if (!savedOrder) {
        res.status(503).json({message:"Sorry , Please try to re-order agian"});
      }else{
        // Create Balance Object when add new order
        await createBalance(savedOrder);
        await silodItemProduct(savedOrder.products)

        res.status(201).json({message:"Done" , savedOrder, totalPrice });
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


// Calculate Total Price
let orderTotalPrice = async(req, res)=>{
  try{
    if(req.body.items.length > 0){   
      let total_price = 0;

      let products = req.body.items;
      for(let i = 0; i < products.length; i++){
        let product = await Product.findById(products[i]._id).select('-_id price');
        if(product){
          total_price += (product.price * products[i].qty)
        }else{
          res.status(400).json({message: 'May be Error on Product id'})
        }
      }

      res.status(200).json({total: total_price})
    
    }else{
      res.status(200).json({total: 0})
    }

  }catch(err){
    res.status(400).json({message:"Catch Error : " + err.message})
  }
}


module.exports = {
    createOrder ,
    cancelOrder,
    orderTotalPrice
}
