const Cart = require("../Models/Cart.model");

let getCart = async (req, res) => {
    // TODO: get All products
    try {
        const cartData = await Cart.findOne({ user_id: req.params['user_Id'] }).populate({ path: 'products.product_id', select: "product_name photos price" });
        if (!cartData){
            res.status(400).json({message:"No products available"})
        } else {
            res.status(200).json(cartData);
        }
    } catch (err) {
        res.status(400).json({message: `Catch Error: ${err.message}`})
    }
}

// cart delete check ????????
let deleteCartOnOrder = (userId) => {
    // TODO: delete cart after submit order
    Cart.findOneAndDelete({ user_id: userId }).then(() => {
        res.status(200).json({ message: 'cart deleted successfully' })
    }).catch(err => {
        res.status(400).json({ message: 'Something wrong happened!' })
    }) ;
}

// check expire and delete cart
let deleteCartOnExpire = async (userId) => {
    // TODO: delete cart after expire date
    // let expiresIn = '1';
    let expireDate = cart.createdAt + expiresIn;
    const cart = await Cart.findOne({ user_id: userId });
    setInterval(() => {
        if(expireDate == cart.expireAt) {
            deleteCart(cart)
        }
    }, expiresIn)
}

let addToCart = async (req, res) => {
    try{
        // TODO: add to cart
        const cart = await Cart.findOne({ user_id: req.params['userId'] });
        const prodId = req.params['productId'];
        if(cart) {
            let existedProduct = cart.products.find(productInfo =>  productInfo.product_id == prodId);
            if(!existedProduct) {
                await Cart.findOneAndUpdate(
                { user_id: req.params['userId'] }, 
                { $push: { "products": { product_id: prodId }}}, 
                {new:true});
                res.status(200).json({ message: "updated cart" });
            } else {
                res.status(400).json({ message: "this product exists in cart" });
            }
        } else {
            let newCart = new Cart({ user_id: req.params['userId'], products: [{ product_id: prodId, quantity: 1 }] });
            let cartInfo = await newCart.save();
            res.status(200).json(cartInfo);
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }
}

// Update From Ahmed Gomaa 
let saveCart = async (req, res) => {
    try{
        // TODO: add cart
        // Analyze the cart => Find exisiting cart ==> update cart
        const cart = await Cart.findOneAndUpdate({ user_id: req.params['userId'] }, { products: req.body.products },{ new:true, upsert: true });

        // Split the string into an array of strings
        
        //const stringArray = requestBody.split("-");

        // Map the array of strings to an array of objects

        // const objectArray = stringArray.map(item => {
        // const values = item.split(",");
        // return { product_id: values[0], quantity: parseFloat(values[1]) };
        // });
        // console.log(typeof(requestBody))
        if(cart) {
            res.status(200).json({ message: "updated cart and saved", cart });
        }
        else{
            res.status(400).json({ message: "Cant Get This Cart" });
        }
    }
    catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}

let deleteFromCart = async (req, res) => {

    try{
        
        // TODO: delete from cart
        const cart = await Cart.findOne({ user_id: req.params['userId'] });
        const prodId = req.params['productId'];
        let existedProduct = cart.products.find(productInfo =>  productInfo.product_id == prodId);
        if(!existedProduct) {
            res.status(200).json({ message: "this product not exists in cart" });
        }
        await Cart.findOneAndUpdate(
            { user_id: req.params['userId'] }, 
            { $pull: { "products": { product_id: prodId }}},
            { new:true });

        res.status(200).json({ message: "delete prodcut from cart and updated successfully" });
    
    }catch(err){
        res.status(400).json({message: 'Catch Error : ' + err.message})
    }

}

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    saveCart
}
