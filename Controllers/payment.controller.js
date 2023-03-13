const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


let createPayment = async (req, res)=>{
    try{
        let total_price = +req.body.total 
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: total_price * 100,
            
        });
        
        res.status(201).json({clientSecret: paymentIntent.client_secret})

    }catch(err){
        res.status(400).json({message: 'Catch Erro : ' + err.message})
    }
}



module.exports = {
    createPayment ,
}